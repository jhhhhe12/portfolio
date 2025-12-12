<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

require_once 'config.php';

$error = '';
$debug = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    
    if (!empty($username) && !empty($password)) {
        try {
            $conn = getConnection();
            
            // Prepare statement to prevent SQL injection
            $stmt = $conn->prepare("SELECT id, username, email FROM users WHERE username = ? AND password = MD5(?)");
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows == 1) {
                $user = $result->fetch_assoc();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['email'] = $user['email'];
                
                $stmt->close();
                $conn->close();
                
                header('Location: dashboard.php');
                exit();
            } else {
                $error = '아이디 또는 비밀번호가 잘못되었습니다.';
            }
            
            $stmt->close();
            $conn->close();
        } catch (Exception $e) {
            $error = '로그인 처리 중 오류가 발생했습니다.';
            $debug = $e->getMessage();
        }
    } else {
        $error = '모든 필드를 입력해주세요.';
    }
}
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 - Hamini Store</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .login-header h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .login-header p {
            color: #666;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .error-message {
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        
        .btn-login {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .btn-login:hover {
            transform: translateY(-2px);
        }
        
        .form-footer {
            margin-top: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        
        .form-footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        .demo-info {
            margin-top: 20px;
            padding: 15px;
            background: #f0f4ff;
            border-radius: 5px;
            font-size: 13px;
            color: #555;
        }
        
        .demo-info strong {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>🔐 로그인</h1>
            <p>Hamini Store에 오신 것을 환영합니다</p>
        </div>
        
        <?php if ($error): ?>
        <div class="error-message">
            <?php echo htmlspecialchars($error); ?>
            <?php if ($debug): ?>
            <br><small>Debug: <?php echo htmlspecialchars($debug); ?></small>
            <?php endif; ?>
        </div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="username">아이디</label>
                <input type="text" id="username" name="username" required autofocus value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>">
            </div>
            
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="btn-login">로그인</button>
        </form>
        
        <div class="form-footer">
            계정이 없으신가요? <a href="register.php">회원가입</a> | <a href="accounts.html">테스트 계정 보기</a>
        </div>
        
        <div class="demo-info">
            <strong>빠른 테스트:</strong>
            admin / admin1234<br>
            testuser / test1234
        </div>
    </div>
</body>
</html>
