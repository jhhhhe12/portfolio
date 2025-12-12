<?php
require_once 'config.php';

// Logout user
session_destroy();
header('Location: login.php');
exit();
?>
