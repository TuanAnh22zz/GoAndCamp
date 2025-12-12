
document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const minusBtn = document.querySelector(".minus-btn");
    const plusBtn = document.querySelector(".plus-btn");
    const btnBuyNow = document.querySelector(".btn-buy-now");
    const btnAddToCart = document.querySelector(".btn-add-to-cart");
    
    const titleEl = document.querySelector(".product-title");
    const priceEl = document.querySelector(".current-price");
    const imgEl = document.querySelector(".product-image");
    const descEl = document.querySelector(".description-content");

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        if(titleEl) titleEl.textContent = "Không tìm thấy ID sản phẩm.";
        return;
    }

    fetch(`http://localhost/GoAndCamp/api/get_product_detail.php?id=${productId}`)
        .then((res) => {
            if (!res.ok) throw new Error("Không tìm thấy sản phẩm hoặc lỗi Server.");
            return res.json();
        })
        .then((product) => {
            if(titleEl) titleEl.textContent = product.name;
            if(priceEl) priceEl.textContent = `$${parseFloat(product.price).toFixed(2)}`;
            if(descEl) descEl.innerHTML = product.description;

            let imgPath = product.image_url;
            if (!imgPath.startsWith('http') && !imgPath.startsWith('/')) {
                imgPath = '/' + imgPath;
            }
            if(imgEl) imgEl.src = imgPath;


            minusBtn.addEventListener("click", function () {
                let current = parseInt(quantityInput.value);
                if (current > 1) quantityInput.value = current - 1;
            });

            plusBtn.addEventListener("click", function () {
                let current = parseInt(quantityInput.value);
                quantityInput.value = current + 1;
            });

            function addToCart(goToCart = false) {
                const quantity = parseInt(quantityInput.value);
                
                const cartItem = {
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    image: imgPath, 
                    quantity: quantity
                };

                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = cart.find(item => item.id == cartItem.id); 

                if (existing) {
                    existing.quantity += cartItem.quantity;
                } else {
                    cart.push(cartItem);
                }

                localStorage.setItem("cart", JSON.stringify(cart));

                if (goToCart) {
                    window.location.href = "CART.HTML"; 
                } else {
                    alert("Đã thêm sản phẩm vào giỏ hàng!");
                }
            }

            if(btnAddToCart) btnAddToCart.addEventListener("click", () => addToCart(false));
            if(btnBuyNow) btnBuyNow.addEventListener("click", () => addToCart(true));

        })
        .catch((err) => {
            console.error(err);
            if(titleEl) titleEl.textContent = "Lỗi tải sản phẩm.";
        });
});