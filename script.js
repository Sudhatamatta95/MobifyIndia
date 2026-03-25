// ========================================
// 🎯 MOBIFY INDIA - OPTIMIZED JAVASCRIPT
// ========================================

let cart = [];
let currentProductId = null;

// Initialize swiper sliders
document.addEventListener('DOMContentLoaded', () => {
  initializeSwipers();
  loadCart();
  updateCartUI();
  setupSearch();
  addImageFallbacks();
});

// Add fallback handler for images
function addImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'https://via.placeholder.com/250x250/CCCCCC/FFFFFF?text=Image+Not+Found';
      this.style.backgroundColor = '#f0f0f0';
    });
  });
}

// Swiper Initialization
function initializeSwipers() {
  new Swiper(".top-slider", {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 2500 },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
  });

  new Swiper(".banner-image-swiper", {
    loop: true,
    slidesPerView: 1,
    autoplay: { delay: 2000 },
    pagination: { el: ".banner-image-pagination", clickable: true },
    navigation: { nextEl: ".banner-image-swiper .swiper-button-next", prevEl: ".banner-image-swiper .swiper-button-prev" },
    speed: 800
  });
}

// === DROPDOWN FUNCTIONS ===
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

window.onclick = (e) => {
  if (!e.target.matches('.dropdown-btn')) {
    document.querySelectorAll(".dropdown-content").forEach(d => d.style.display = "none");
  }
};

// === TAB FUNCTION ===
function openTab(evt, tabName) {
  document.querySelectorAll(".tab-content").forEach(t => t.style.display = "none");
  document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// === NAVIGATION ===
function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

// === CART MANAGEMENT ===
function addToCart(productId, productName, price, imageUrl, buttonElement) {
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
    showNotification(`${productName} quantity updated!`, 'success');
  } else {
    cart.push({ id: productId, name: productName, price: parseInt(price), image: imageUrl, quantity: 1 });
    showNotification(`${productName} added to cart!`, 'success');
  }
  
  if (buttonElement) {
    buttonElement.style.background = '#4CAF50';
    buttonElement.textContent = 'Added! ✓';
    setTimeout(() => { buttonElement.textContent = 'Add to Cart'; }, 2000);
  }
  
  updateCartUI();
  saveCart();
}

function updateCartUI() {
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const cartTotal = cart.reduce((t, i) => t + (i.price * i.quantity), 0);
  
  document.getElementById('cartCount').textContent = cartCount;
  document.getElementById('cartTotal').textContent = cartTotal;
  
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart.length === 0 
      ? '<p style="text-align:center;color:#666;padding:20px">Your cart is empty</p>'
      : cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;border-radius:8px">
            <div style="flex:1;margin-left:15px">
              <h4 style="margin:0;font-size:14px">${item.name}</h4>
              <p style="margin:5px 0">₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</p>
              <div style="display:flex;gap:8px">
                <button onclick="changeQuantity('${item.id}', -1)" style="background:#87CEEB;color:white;border:none;width:25px;height:25px;border-radius:50%;cursor:pointer">-</button>
                <span style="background:#f0f0f0;padding:2px 8px;border-radius:4px;font-weight:bold">${item.quantity}</span>
                <button onclick="changeQuantity('${item.id}', 1)" style="background:#87CEEB;color:white;border:none;width:25px;height:25px;border-radius:50%;cursor:pointer">+</button>
                <button onclick="removeFromCart('${item.id}')" style="background:#ff4757;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;margin-left:10px">🗑️</button>
              </div>
            </div>
          </div>
        `).join('');
  }
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
}

function changeQuantity(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      item.quantity = newQuantity;
      updateCartUI();
      saveCart();
    }
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
  saveCart();
}

function checkout() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }
  const total = cart.reduce((t, i) => t + (i.price * i.quantity), 0);
  alert(`Checkout successful! Total: ₹${total}\nThank you for shopping!`);
  cart = [];
  updateCartUI();
  saveCart();
  toggleCart();
}

function saveCart() {
  localStorage.setItem('mobifyCart', JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem('mobifyCart');
  cart = saved ? JSON.parse(saved) : [];
}

// === MODAL FUNCTIONS ===
function openLoginModal(productId) {
  currentProductId = productId;
  document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
}

function confirmOrder() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (!username || !password) {
    document.getElementById('errorMsg').textContent = 'Please enter both username and password';
    return;
  }
  
  closeLoginModal();
  document.getElementById('confirmBox').classList.remove('hidden');
  setTimeout(closeConfirmation, 3000);
}

function closeConfirmation() {
  document.getElementById('confirmBox').classList.add('hidden');
}

// === SEARCH FUNCTION ===
function setupSearch() {
  const searchInput = document.getElementById('productSearch');
  const searchBtn = document.getElementById('searchBtn');
  
  const performSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) { showNotification('Please type something to search', 'error'); return; }
    
    let found = false;
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      if (title.includes(query)) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('search-blink');
        setTimeout(() => card.classList.remove('search-blink'), 2400);
        showNotification(`Found: ${title}`, 'success');
        found = true;
      }
    });
    
    if (!found) showNotification('Product not found!', 'error');
    searchInput.value = '';
  };
  
  searchBtn?.addEventListener('click', performSearch);
  searchInput?.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });
}

// === NOTIFICATIONS ===
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white; padding: 15px 20px; border-radius: 12px;
    z-index: 10000; font-weight: bold;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    animation: slideInRight 0.4s ease;
    min-width: 300px; display: flex; gap: 10px;
  `;
  notification.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span><span>${message}</span>`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// === BUY NOW FUNCTION ===
function buyNow(productId, productName, price) {
  const product = PRODUCTS.find(p => p.id === productId);
  const imageUrl = product ? product.image : '';
  addToCart(productId, productName, price, imageUrl, null);
  openLoginModal(productId);
}

// === ANIMATIONS ===
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
  @keyframes searchBlink {
    0%, 100% { border-color: #87CEEB; box-shadow: 0 0 20px rgba(135,206,235,0.6); transform: scale(1.02); opacity: 1; }
    50% { border-color: #FF6B6B; box-shadow: 0 0 30px rgba(255,107,107,0.8); transform: scale(1.05); opacity: 1; }
  }
  .search-blink { animation: searchBlink 0.8s ease-in-out 3 !important; border: 4px solid #FF6B6B !important; border-radius: 15px !important; }
  .login-modal, .confirmation-box { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.3); z-index: 10001; width: 90%; max-width: 400px; }
  .login-modal.hidden, .confirmation-box.hidden { display: none; }
  .modal-content input { width: 100%; padding: 10px; margin: 10px 0; border: 2px solid #ddd; border-radius: 8px; }
  .modal-content button { width: 100%; padding: 10px; margin-top: 10px; background: #0088ff; color: white; border: none; border-radius: 8px; cursor: pointer; }
  .close-modal { float: right; font-size: 28px; cursor: pointer; }
  .cart-item { display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #eee; }
`;
document.head.appendChild(style);

console.log('✅ Mobify India - Optimized & Ready!');
