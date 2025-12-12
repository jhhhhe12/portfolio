<?php
require_once 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$username = $_SESSION['username'];
$email = $_SESSION['email'];
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대시보드 - Hamini Store</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #f5f7fa;
        }
        
        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .navbar h1 {
            font-size: 24px;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logout-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background 0.3s;
        }
        
        .logout-btn:hover {
            background: rgba(255,255,255,0.3);
        }
        
        .container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
        }
        
        .welcome-card {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .welcome-card h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 32px;
        }
        
        .welcome-card p {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .info-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .info-card h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .info-card p {
            color: #666;
            font-size: 14px;
        }
        
        .user-details {
            background: #f0f4ff;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
        }
        
        .user-details strong {
            color: #333;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <h1>🏪 Hamini Store</h1>
        <div class="user-info">
            <span>환영합니다, <strong><?php echo htmlspecialchars($username); ?></strong>님</span>
            <a href="logout.php" class="logout-btn">로그아웃</a>
        </div>
    </nav>
    
    <div class="container">
        <div class="welcome-card">
            <h2>👋 환영합니다!</h2>
            <p>로그인에 성공했습니다. 이 페이지는 MySQL의 web 데이터베이스 users 테이블을 사용하여 인증된 페이지입니다.</p>
            
            <div class="user-details">
                <strong>사용자 정보:</strong><br>
                아이디: <?php echo htmlspecialchars($username); ?><br>
                이메일: <?php echo htmlspecialchars($email); ?>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-card">
                <h3>📊 데이터베이스</h3>
                <p>MySQL 8.0을 사용하여 사용자 정보를 안전하게 관리합니다.</p>
            </div>
            
            <div class="info-card">
                <h3>🔒 보안</h3>
                <p>비밀번호는 MD5 해시로 암호화되어 저장됩니다.</p>
            </div>
            
            <div class="info-card">
                <h3>🌐 도메인</h3>
                <p>HTTPS 프로토콜로 안전한 통신을 제공합니다.</p>
            </div>
            
            <div class="info-card">
                <h3>⚡ 성능</h3>
                <p>Nginx와 PHP-FPM으로 빠른 응답 속도를 제공합니다.</p>
            </div>
        </div>
    </div>
</body>
</html>
