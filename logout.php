<?php
require_once 'config.php';

// 세션 완전히 파괴
$_SESSION = array();
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();

// 메인 페이지로 리다이렉트
header('Location: /');
exit();
?>
