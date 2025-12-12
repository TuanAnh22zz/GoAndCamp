<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$inputData = json_decode(file_get_contents("php://input"), true);

if (
    empty($inputData['customer']) || 
    empty($inputData['cart']) || 
    empty($inputData['total'])
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Dữ liệu không hợp lệ."]);
    exit();
}

try {
    $conn->beginTransaction();

    $sql_order = "INSERT INTO orders (customer_name, phone, address, note, total_amount) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql_order);
    $stmt->execute([
        $inputData['customer']['name'],
        $inputData['customer']['phone'],
        $inputData['customer']['address'],
        $inputData['customer']['note'] ?? '', 
        $inputData['total']
    ]);

    $order_id = $conn->lastInsertId();

    $sql_item = "INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)";
    $stmt_item = $conn->prepare($sql_item);

    foreach ($inputData['cart'] as $item) {
        $stmt_item->execute([
            $order_id,
            $item['id'],
            $item['name'],
            $item['quantity'],
            $item['price']
        ]);
    }

    $conn->commit();

    echo json_encode(["status" => "success", "message" => "Đặt hàng thành công!", "order_id" => $order_id]);

} catch (Exception $e) {
    $conn->rollBack();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Lỗi Server: " . $e->getMessage()]);
}
?>