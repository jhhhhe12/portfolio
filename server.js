const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'webadmin',
    password: 'Rnjsaltjs12!',
    database: 'web'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS 설정
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use(session({
    secret: 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: { 
        secure: false,
        httpOnly: false,
        maxAge: 3600000,
        sameSite: 'lax',
        path: '/'
    },
    name: 'sessionId'
}));

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// 로그인 페이지
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 로그인 처리
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: '아이디와 비밀번호를 입력해주세요.' });
    }

    db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.userId = user.id;
            req.session.username = user.username;
            console.log('Login successful - Setting session:', req.session);
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.status(500).json({ success: false, message: '세션 저장 오류' });
                }
                console.log('Session saved successfully:', req.sessionID);
                return res.json({ success: true, message: '로그인 성공', username: user.username });
            });
        } else {
            return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }
    });
});

// 회원가입 처리
app.post('/register', async (req, res) => {
    const { username, password, email, full_name } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: '아이디와 비밀번호를 입력해주세요.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.query('INSERT INTO user (username, password, email, full_name, role, is_active) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, hashedPassword, email || null, full_name || '회원', 'member', 1], 
            (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.' });
                    }
                    console.error(err);
                    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
                }
                return res.json({ success: true, message: '회원가입이 완료되었습니다. 회원 등급으로 가입되었습니다.' });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});

// 로그아웃
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: '로그아웃 되었습니다.' });
});

// 인증 확인
app.get('/check-auth', (req, res) => {
    console.log('Check auth request - Session:', req.session);
    console.log('Session ID:', req.sessionID);
    console.log('User ID:', req.session.userId);
    if (req.session.userId) {
        res.json({ authenticated: true, username: req.session.username });
    } else {
        res.json({ authenticated: false });
    }
});

// 게시판 페이지
app.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, 'board.html'));
});

// 게시글 목록 조회 (로그인 불필요)
app.get('/api/posts', (req, res) => {
    db.query('SELECT post_id, title, author, views, created_at FROM posts ORDER BY post_id DESC', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: '서버 오류' });
        }
        res.json(results);
    });
});

// 게시글 상세 조회 (로그인 불필요, 조회수 증가)
app.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;
    
    // 조회수 증가
    db.query('UPDATE posts SET views = views + 1 WHERE post_id = ?', [postId], (err) => {
        if (err) console.error(err);
    });

    db.query('SELECT * FROM posts WHERE post_id = ?', [postId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: '서버 오류' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }
        res.json(results[0]);
    });
});

// 게시글 작성 (로그인 필요)
app.post('/api/posts', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
    }

    const { title, content } = req.body;
    const author = req.session.username;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: '제목과 내용을 입력해주세요.' });
    }

    db.query(
        'INSERT INTO posts (author, password, title, content) VALUES (?, ?, ?, ?)',
        [author, '', title, content],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: '서버 오류' });
            }
            res.json({ success: true, message: '게시글이 작성되었습니다.', postId: results.insertId });
        }
    );
});

// 게시글 수정 (작성자만 가능)
app.put('/api/posts/:id', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
    }

    const postId = req.params.id;
    const { title, content } = req.body;
    const username = req.session.username;

    // 작성자 확인
    db.query('SELECT author FROM posts WHERE post_id = ?', [postId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: '서버 오류' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }
        if (results[0].author !== username) {
            return res.status(403).json({ success: false, message: '수정 권한이 없습니다.' });
        }

        // 게시글 수정
        db.query(
            'UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE post_id = ?',
            [title, content, postId],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: '서버 오류' });
                }
                res.json({ success: true, message: '게시글이 수정되었습니다.' });
            }
        );
    });
});

// 게시글 삭제 (작성자만 가능)
app.delete('/api/posts/:id', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
    }

    const postId = req.params.id;
    const username = req.session.username;

    // 작성자 확인
    db.query('SELECT author FROM posts WHERE post_id = ?', [postId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: '서버 오류' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: '게시글을 찾을 수 없습니다.' });
        }
        if (results[0].author !== username) {
            return res.status(403).json({ success: false, message: '삭제 권한이 없습니다.' });
        }

        // 게시글 삭제
        db.query('DELETE FROM posts WHERE post_id = ?', [postId], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: '서버 오류' });
            }
            res.json({ success: true, message: '게시글이 삭제되었습니다.' });
        });
    });
});


app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
