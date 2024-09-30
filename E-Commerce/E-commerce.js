const products = [
    { id: 1, name: 'Product 1', price: '$19.99', description: 'This is a great product.', image: 'https://i.ibb.co/VS2vf2w/Product-3.jpg' },
    { id: 2, name: 'Product 2', price: '$29.99', description: 'This is another great product.', image: 'https://i.ibb.co/DtdTM0F/Product-5.jpg' },
    { id: 3, name: 'Product 3', price: '$39.99', description: 'This is a fantastic product.', image: 'https://i.ibb.co/mqHLCtn/Product-4.jpg' },
    { id: 4, name: 'Product 4', price: '$49.99', description: 'This is a premium product.', image: 'https://i.ibb.co/FBfG6gp/Product-1.jpg' },
    { id: 5, name: 'Product 5', price: '$59.99', description: 'This is an exclusive product.', image: 'https://i.ibb.co/8DnxYhv/Product-2.jpg' }
];
    
    let cart = [];

    function showHome() {
        document.getElementById('home').classList.remove('hidden');
        document.getElementById('products').classList.add('hidden');
        document.getElementById('product-details').classList.add('hidden');
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('contact').classList.add('hidden');
    }

    function showProducts() {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('products').classList.remove('hidden');
        document.getElementById('product-details').classList.add('hidden');
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('contact').classList.add('hidden');
        
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
                <a href="#" onclick="showProductDetails(${product.id})" class="button">View Details</a>
            `;
            productList.appendChild(productCard);
        });
    }

    function showProductDetails(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            document.getElementById('home').classList.add('hidden');
            document.getElementById('products').classList.add('hidden');
            document.getElementById('product-details').classList.remove('hidden');
            document.getElementById('cart').classList.add('hidden');
            document.getElementById('contact').classList.add('hidden');
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-image').src = product.image;
        }
    }

    function addToCart() {
        const productName = document.getElementById('product-name').textContent;
        const product = products.find(p => p.name === productName);
        if (product) {
            cart.push(product);
            showCart();
        }
    }

    function showCart() {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('products').classList.add('hidden');
        document.getElementById('product-details').classList.add('hidden');
        document.getElementById('cart').classList.remove('hidden');
        document.getElementById('contact').classList.add('hidden');
        
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }


    function showContact() {
        document.getElementById('home').classList.add('hidden');
        document.getElementById('products').classList.add('hidden');
        document.getElementById('product-details').classList.add('hidden');
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('contact').classList.remove('hidden');
    }

    function handleContactForm(event) {
        event.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-message').value = '';
    }

    // Show home section by default
    showHome();
function buyProducts(){
    alert(`You have brought ${cart.length} items`);
showHome();
cart.length=0;
}