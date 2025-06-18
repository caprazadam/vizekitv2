<?php
// Database configuration
$host = 'localhost';
$dbname = 'vizekit';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // Fallback to static data if database connection fails
    $pdo = null;
}

// Site configuration
define('SITE_NAME', 'VizeKit');
define('SITE_URL', 'https://yourdomain.com');
define('CONTACT_PHONE', '+908503466646');
define('CONTACT_EMAIL', 'info@vizekit.com');
?>