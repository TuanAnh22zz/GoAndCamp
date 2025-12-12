
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost/GoAndCamp/api/get_cookware.php')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            
            productList.innerHTML = '';

            if (products.length === 0) {
                productList.innerHTML = '<p style="text-align:center; width:100%;">Chưa có sản phẩm nào.</p>';
                return;
            }

            products.forEach(product => {
                const productDiv = document.createElement('div');
                
                productDiv.classList.add('product'); 

                let imgPath = product.image_url;
                if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
                    imgPath = '/' + imgPath;
                }

                const price = parseFloat(product.price).toFixed(2);

                productDiv.innerHTML = `
                    <div class="img_product" style="background-image: url('${imgPath}');"></div>
                    <div class="title">${product.name}</div>
                    <span>$${price}</span>
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
            console.error('Lỗi khi lấy dữ liệu:', error);
            const list = document.getElementById('product-list');
            if(list) list.innerHTML = `<p style="color:red; text-align:center;">Lỗi kết nối Server.</p>`;
        });
});