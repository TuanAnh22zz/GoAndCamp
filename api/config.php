<?php


$host = 'localhost';
$db_name = 'goandcamp';  
$username = 'root';      
$password = '';          

try {
    $dsn = "mysql:host=$host;dbname=$db_name;charset=utf8mb4";
    
    $conn = new PDO($dsn, $username, $password);

    
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    date_default_timezone_set('Asia/Ho_Chi_Minh');


} catch(PDOException $e) {
    echo "Lỗi kết nối Database: " . $e->getMessage();
    die(); 
}
?>