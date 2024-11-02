document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a").forEach(anchor => {
      anchor.addEventListener("click", function (event) {
          if (this.hash) {
              event.preventDefault();
              const hash = this.hash;

              const targetElement = document.querySelector(hash);
              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop,
                      behavior: "smooth"
                  });

                  setTimeout(() => {
                      window.location.hash = hash;
                  }, 800);
              }
          }
      });
  });
});

document.querySelectorAll(".menu-items a").forEach(link => {
  link.addEventListener("click", () => {
      const checkbox = document.getElementById("checkbox");
      if (checkbox) {
          checkbox.checked = false;
      }
  });
});

// Function to add product to cart and store in localStorage
function addToCart(name, price, imageUrl) {
  // Retrieve current cart from localStorage or create an empty array if none exists
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add new item to the cart array
  cart.push({ name, price, imageUrl });

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to cart page
  window.location.href = "Cart Page/cart.html"; // Adjust this to your actual cart page URL
}