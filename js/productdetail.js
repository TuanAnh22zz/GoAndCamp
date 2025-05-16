document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const minusBtn = document.querySelector(".minus-btn");
  const plusBtn = document.querySelector(".plus-btn");
  const btnBuyNow = document.querySelector(".btn-buy-now");
  const btnAddToCart = document.querySelector(".btn-add-to-cart");

  // Tăng/giảm số lượng
  minusBtn.addEventListener("click", function () {
      let current = parseInt(quantityInput.value);
      if (current > 1) quantityInput.value = current - 1;
  });

  plusBtn.addEventListener("click", function () {
      let current = parseInt(quantityInput.value);
      quantityInput.value = current + 1;
  });

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
      document.querySelector(".product-title").textContent = "Sản phẩm không xác định.";
      return;
  }

  fetch(`https://db-server-eight.vercel.app/products/${productId}`)
      .then((res) => {
          if (!res.ok) throw new Error("Không tìm thấy sản phẩm.");
          return res.json();
      })
      .then((product) => {
          document.querySelector(".product-title").textContent = product.name;
          document.querySelector(".current-price").textContent = `$${product.price.toFixed(2)}`;
          document.querySelector(".product-image").src = product.image_url;
          document.querySelector(".description-content").innerHTML = product.description;

          // Hàm thêm sản phẩm vào localStorage
          function addToCart(goToCart = false) {
              const quantity = parseInt(quantityInput.value);
              const cartItem = {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image_url,
                  quantity: quantity
              };

              let cart = JSON.parse(localStorage.getItem("cart")) || [];
              const existing = cart.find(item => item.id === cartItem.id);

              if (existing) {
                  existing.quantity += cartItem.quantity;
              } else {
                  cart.push(cartItem);
              }

              localStorage.setItem("cart", JSON.stringify(cart));

              if (goToCart) {
                  window.location.href = "/CART.HTML";
              } else {
                  alert("Product has been added to cart!");
              }
          }

          btnAddToCart.addEventListener("click", () => addToCart(false));
          btnBuyNow.addEventListener("click", () => addToCart(true));
      })
      .catch((err) => {
          console.error(err);
          document.querySelector(".product-title").textContent = "Không tìm thấy sản phẩm.";
      });
});
