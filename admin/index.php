<?php

include_once '../api/config.php';

$sql = "SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        ORDER BY p.id DESC"; 

$stmt = $conn->prepare($sql);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - GoAndCamp</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        .admin-product-img {
            width: 80px;
            height: 60px;
            object-fit: contain; 
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #fff;
        }
    </style>
</head>
<body class="bg-light">

    <nav class="navbar navbar-dark bg-primary mb-4">
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.php">
                <i class="fas fa-user-cog"></i> Trang Quản Trị Admin
            </a>
            <a href="../index.php" class="btn btn-outline-light btn-sm">
                <i class="fas fa-arrow-left"></i> Về trang bán hàng
            </a>
        </div>
    </nav>

    <div class="container bg-white p-4 rounded shadow-sm">
        
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="text-primary">Danh sách sản phẩm</h3>
            <a href="create.php" class="btn btn-success">
                <i class="fas fa-plus-circle"></i> Thêm sản phẩm mới
            </a>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th class="text-center" width="5%">ID</th>
                        <th class="text-center" width="10%">Hình ảnh</th>
                        <th width="30%">Tên sản phẩm</th>
                        <th width="15%">Giá</th>
                        <th width="15%">Danh mục</th>
                        <th width="15%">Mô tả ngắn</th>
                        <th class="text-center" width="10%">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(count($products) > 0): ?>
                        <?php foreach ($products as $row): ?>
                        <tr>
                            <td class="text-center fw-bold"><?= $row['id'] ?></td>
                            <td class="text-center">
                                <?php 
                                    $imgSrc = $row['image_url'];
                                    
                                    if (!str_contains($imgSrc, 'http')) {
                                        
                                        $displayImg = "../" . ltrim($imgSrc, '/'); 
                                    } else {
                                        $displayImg = $imgSrc;
                                    }
                                ?>
                                <img src="<?= $displayImg ?>" class="admin-product-img" alt="Ảnh SP">
                            </td>
                            <td class="fw-semibold"><?= $row['name'] ?></td>
                            <td class="text-success fw-bold">$<?= number_format($row['price'], 2) ?></td>
                            <td>
                                <span class="badge bg-info text-dark">
                                    <?= $row['category_name'] ?? 'Chưa phân loại' ?>
                                </span>
                            </td>
                            <td>
                                <small class="text-muted">
                                    <?= substr($row['description'], 0, 50) ?>...
                                </small>
                            </td>
                            <td class="text-center">
                                <!-- Nút Sửa -->
                                <a href="edit.php?id=<?= $row['id'] ?>" class="btn btn-warning btn-sm mb-1" title="Sửa">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="delete.php?id=<?= $row['id'] ?>" 
                                   class="btn btn-danger btn-sm mb-1" 
                                   onclick="return confirm('Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác!');" 
                                   title="Xóa">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="7" class="text-center py-4">Chưa có sản phẩm nào. Hãy thêm mới!</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>