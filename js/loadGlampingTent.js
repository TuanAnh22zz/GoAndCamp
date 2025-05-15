document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            const campingchairProducts = products.filter(product => product.category_id === 2);

            campingchairProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                productDiv.innerHTML = `
                    <div class="img_product" style="background-image: url('${product.image_url}');"></div>
                    <div class="title">${product.name}</div>
                    <span>$${product.price}</span>
                    <div class="btn_view">
                        <button>VIEW</button>
                    </div>
                `;

                productDiv.addEventListener('click', () => {
                    window.location.href = `/ProductDetail.HTML?id=${product.id}`; 
                });

                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
            document.getElementById('product-list').innerHTML = `<p style="color:red;">Không thể tải sản phẩm.</p>`;
        });
});
