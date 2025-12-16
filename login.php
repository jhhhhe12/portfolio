<?php
error_reporting(0);
ini_set('display_errors', 0);

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    
    if (!empty($username) && !empty($password)) {
        try {
            $conn = getConnection();
            
            $stmt = $conn->prepare("SELECT id, username, email, password FROM user WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows == 1) {
                $user = $result->fetch_assoc();
                
                if (password_verify($password, $user['password'])) {
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];
                    $_SESSION['email'] = $user['email'];
                    
                    $stmt->close();
                    $conn->close();
                    
                    header('Location: /');
                    exit();
                }
            }
            
            $stmt->close();
            $conn->close();
            header('Location: /login.html?error=invalid');
            exit();
            
        } catch (Exception $e) {
            error_log('Login error: ' . $e->getMessage());
            header('Location: /login.html?error=system');
            exit();
        }
    } else {
        header('Location: /login.html?error=empty');
        exit();
    }
}

header('Location: /login.html');
exit();
?>
