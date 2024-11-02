// Function to display items in the cart and calculate total price
function displayCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let totalPrice = 0;
    cartItemsDiv.innerHTML = ""; // Clear previous content

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px;">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        
        cartItemsDiv.appendChild(itemDiv);
        totalPrice += item.price;
    });

    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}

// Checkout function to handle the purchase
function checkout() {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart"); // Clear the cart after purchase
    displayCart(); // Refresh the cart display
}

// Initialize cart display on page load
displayCart();
