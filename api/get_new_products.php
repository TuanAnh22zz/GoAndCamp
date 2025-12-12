<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php'; 

try {
    $sql = "SELECT * FROM products ORDER BY id DESC LIMIT 4";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Lỗi: " . $e->getMessage()]);
}
?>