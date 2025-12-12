<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'webadmin');
define('DB_PASS', 'Rnjsaltjs12!');
define('DB_NAME', 'web');

// Create connection
function getConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

// Start session
session_start();
?>
