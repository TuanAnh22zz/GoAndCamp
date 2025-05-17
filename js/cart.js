document.addEventListener("DOMContentLoaded", () => {
    const cartBox = document.querySelector(".cart-box");
    const cartItemCount = document.querySelector(".cart-item-count");
    const totalAmountEl = document.querySelector(".total-amount");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    function renderCart() {
        cartBox.querySelectorAll(".cart-item").forEach(item => item.remove());

        if (cart.length === 0) {
            cartBox.innerHTML += "<p> Your cart is empty.</p>";
            totalAmountEl.textContent = "$0.00";
            cartItemCount.textContent = "You have 0 products in your cart";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <div class="item-main-info">
                    <button class="item-remove-btn" data-index="${index}" aria-label="Xóa sản phẩm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-description">
                        <h3>${item.name}</h3>
                        <p class="item-price-current">${formatPrice(item.price)}</p>
                    </div>
                </div>
                <div class="item-price-quantity">
                    <p class="item-total-price-single">${formatPrice(itemTotal)}</p>
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
            `;
            cartBox.appendChild(div);
        });

        totalAmountEl.textContent = formatPrice(total);
        cartItemCount.textContent = `You have ${cart.length} product${cart.length > 1 ? 's' : ''} in your cart`;
        attachEventHandlers();
    }

    function attachEventHandlers() {
        document.querySelectorAll(".quantity-btn.plus").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                cart[index].quantity++;
                saveAndRender();
            });
        });

        document.querySelectorAll(".quantity-btn.minus").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    saveAndRender();
                }
            });
        });

        // Xóa sản phẩm
        document.querySelectorAll(".item-remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                cart.splice(index, 1);
                saveAndRender();
            });
        });
    }

    function saveAndRender() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    renderCart();
});
