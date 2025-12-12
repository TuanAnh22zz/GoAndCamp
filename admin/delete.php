<?php
include_once '../api/config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    try {
        $sql = "DELETE FROM products WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->execute([':id' => $id]);
        
       

    } catch (PDOException $e) {
        echo "Lỗi xóa: " . $e->getMessage();
        die();
    }
}

header("Location: index.php");
exit();
?>