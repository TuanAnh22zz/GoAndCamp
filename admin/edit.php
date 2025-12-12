<?php
include_once '../api/config.php';

if (!isset($_GET['id'])) {
    header("Location: index.php");
    exit();
}
$id = $_GET['id'];

$stmt = $conn->prepare("SELECT * FROM products WHERE id = :id");
$stmt->execute([':id' => $id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    die("Sản phẩm không tồn tại!");
}

$stmt_cat = $conn->prepare("SELECT * FROM categories");
$stmt_cat->execute();
$categories = $stmt_cat->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $category_id = $_POST['category_id'];
    $description = $_POST['description'];
    
    $image_url = $product['image_url'];

    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $upload_dir = "../Image/Uploads/";
        if (!file_exists($upload_dir)) mkdir($upload_dir, 0777, true);

        $file_name = time() . "_" . basename($_FILES["image"]["name"]);
        $target_file = $upload_dir . $file_name;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $image_url = "/Image/Uploads/" . $file_name;
        }
    }

    $sql = "UPDATE products 
            SET name = :name, price = :price, category_id = :cat_id, 
                description = :desc, image_url = :img 
            WHERE id = :id";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':price' => $price,
        ':cat_id' => $category_id,
        ':desc' => $description,
        ':img' => $image_url,
        ':id' => $id
    ]);

    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <title>Sửa sản phẩm</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <div class="card shadow-sm">
            <div class="card-header bg-warning text-dark">
                <h4 class="mb-0">Sửa sản phẩm: <?= htmlspecialchars($product['name']) ?></h4>
            </div>
            <div class="card-body">
                <form method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label class="form-label">Tên sản phẩm</label>
                        <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($product['name']) ?>" required>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Giá tiền ($)</label>
                            <input type="number" step="0.01" name="price" class="form-control" value="<?= $product['price'] ?>" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Danh mục</label>
                            <select name="category_id" class="form-control">
                                <?php foreach ($categories as $cat): ?>
                                    <option value="<?= $cat['id'] ?>" <?= ($cat['id'] == $product['category_id']) ? 'selected' : '' ?>>
                                        <?= $cat['name'] ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Hình ảnh</label>
                        <br>
                        <!-- Hiện ảnh cũ -->
                        <?php 
                            $displayImg = str_contains($product['image_url'], 'http') ? $product['image_url'] : "../" . ltrim($product['image_url'], '/');
                        ?>
                        <img src="<?= $displayImg ?>" width="100" class="mb-2 border rounded">
                        <input type="file" name="image" class="form-control">
                        <small class="text-muted">Không chọn file nếu muốn giữ ảnh cũ.</small>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Mô tả chi tiết</label>
                        <textarea name="description" class="form-control" rows="5"><?= htmlspecialchars($product['description']) ?></textarea>
                    </div>

                    <button type="submit" class="btn btn-warning">Cập nhật</button>
                    <a href="index.php" class="btn btn-secondary">Quay lại</a>
                </form>
            </div>
        </div>
    </div>
</body>
</html>