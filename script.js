// Manejo del carrito de compras
let cartItems = [];
let products = []; // Variable para almacenar la información de los productos

// Función para cargar los productos desde el archivo JSON
function loadProducts() {
  return new Promise((resolve, reject) => {
    fetch('productos.json') // Ruta al archivo JSON
      .then(response => response.json())
      .then(data => {
        products = data;
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Función para obtener la información del producto a partir de su ID
function getProductById(productId) {
  return products.find(product => product.id === productId);
}

function addToCart(productId) {
  cartItems.push(productId);
  updateCartItemCount();
}

function updateCartItemCount() {
  const cartItemCount = document.getElementById('cartItemCount');
  cartItemCount.textContent = cartItems.length;
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  cartItemsContainer.innerHTML = '';

  cartItems.forEach(productId => {
    const product = getProductById(productId);
    const productDiv = document.createElement('div');
    productDiv.classList.add('cartItem');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Precio: $${product.price}</p>
    `;
    cartItemsContainer.appendChild(productDiv);
  });
}

function calculateSubtotal() {
  const subtotal = document.getElementById('subtotal');
  let total = 0;
  cartItems.forEach(productId => {
    const product = getProductById(productId);
    total += product.price;
  });
  subtotal.textContent = `Subtotal: $${total.toFixed(2)}`;
}

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
  loadProducts()
    .then(() => {
      displayCartItems();
      calculateSubtotal();
    })
    .catch(error => {
      console.log('Error al cargar los productos:', error);
    });
});

const addToCartBtns = document.querySelectorAll('.addToCartBtn');
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    addToCart(productId);
    displayCartItems();
    calculateSubtotal();
  });
});

const checkoutBtn = document.getElementById('checkoutBtn');
checkoutBtn.addEventListener('click', () => {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked');

  // Realizar el pago y envío con los métodos seleccionados

  // Reiniciar el carrito y redirigir al usuario a la página de confirmación o agradecimiento
  cartItems = [];
  updateCartItemCount();
  displayCartItems();
  calculateSubtotal();
  // Opcional: mostrar un mensaje de éxito o enviar una notificación al usuario
});
