document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost/GoAndCamp/api/get_new_products.php') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            
            productList.innerHTML = '';

            if (products.length === 0) {
                productList.innerHTML = '<p style="text-align:center;">Chưa có sản phẩm nào trong Database.</p>';
                return;
            }

            products.forEach(product => {
                const productDiv = document.createElement('div');
                
                
                productDiv.classList.add('product-item'); 

              
                let imgPath = product.image_url;
                if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
                    imgPath = '/' + imgPath; 
                }
              
               
                const price = parseFloat(product.price).toFixed(2);

             
                productDiv.innerHTML = `
                    <div class="product-img-box">
                        <img src="${imgPath}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
                    </div>
                    <div class="product-info" style="padding: 10px;">
                        <div class="title" style="font-weight: bold; margin-bottom: 5px; height: 40px; overflow: hidden;">
                            ${product.name}
                        </div>
                        <span style="color: #d63384; font-weight: bold;">$${price}</span>
                        <div class="btn_view" style="margin-top: 10px;">
                            <button style="cursor: pointer; padding: 5px 15px; background: #333; color: #fff; border: none;">VIEW</button>
                        </div>
                    </div>
                `;

                productDiv.addEventListener('click', () => {
                    
                    window.location.href = `ProductDetail.HTML?id=${product.id}`; 
                });

                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
            const productList = document.getElementById('product-list');
            if (productList) {
                productList.innerHTML = `<p style="color:red; text-align:center;">Không thể kết nối đến Database PHP.<br>Hãy kiểm tra lại XAMPP.</p>`;
            }
        });
});