document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    const confirmOrderButton = document.getElementById('confirm-order');
    const modal = document.getElementById('confirmation-modal');
    const startNewOrderButton = document.getElementById('start-new-order');
    const orderSummary = document.getElementById('order-summary');
  
    let cart = [];
  
    const products = [
      { name: 'Waffle with Berries', price: 6.5, image: 'assets/image-waffle-desktop.jpg' },
      { name: 'Vanilla Bean Crème Brûlée', price: 7.0, image: 'assets/image-creme-brulee-desktop.jpg' },
      { name: 'Macaron Mix of Five', price: 8.0, image: 'assets/image-macaron-desktop.jpg' },
      { name: 'Classic Tiramisu', price: 5.5, image: 'assets/image-tiramisu-desktop.jpg' },
      { name: 'Red Velvet Cake', price: 4.5, image: 'assets/image-cake-desktop.jpg' },
      { name: 'Salted Caramel Brownie', price: 5.5, image: 'assets/image-brownie-desktop.jpg' },
    ];
  
    function renderProducts() {
      productsContainer.innerHTML = '';
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
  
        productElement.querySelector('button').addEventListener('click', (e) => {
          const name = e.target.dataset.name;
          const price = parseFloat(e.target.dataset.price);
  
          const existingItem = cart.find(item => item.name === name);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({ name, price, quantity: 1 });
          }
  
          updateCart();
        });
      });
    }
  
    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.quantity} <span>$${(item.price * item.quantity).toFixed(2)}</span>`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
      });
  
      cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
      totalPrice.textContent = `$${total.toFixed(2)}`;
  
      if (cart.length === 0) {
        confirmOrderButton.disabled = true;
        cartItems.innerHTML = '<p class="empty-cart">Your added items will appear here</p>';
      } else {
        confirmOrderButton.disabled = false;
      }
    }
  
    confirmOrderButton.addEventListener('click', () => {
      modal.classList.add('visible');
      orderSummary.innerHTML = '';
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.quantity} <span>$${(item.price * item.quantity).toFixed(2)}</span>`;
        orderSummary.appendChild(li);
      });
    });
  
    startNewOrderButton.addEventListener('click', () => {
      cart = [];
      updateCart();
      modal.classList.remove('visible');
    });
  
    renderProducts();
    updateCart();
  });
  