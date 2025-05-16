document.addEventListener('DOMContentLoaded', () => {
    fetch('https://db-server-eight.vercel.app/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            const lightweightProducts = products.filter(product => product.name === "Cloud UP 2 People 3-season Camping Tent Ultralight 20D" || product.name ==="Mongar 2 People Camping Tent Regular" || product.name ==="CW280 Ultralight Sleeping Bag" );

            lightweightProducts.forEach(product => {
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
