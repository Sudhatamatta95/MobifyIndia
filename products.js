// Products data - Easy to manage and update
const PRODUCTS = [
  { id: 1, name: 'Bluetooth Speaker', price: 999, oldPrice: 1299, discount: '30%', link: 'bluetoothspeaker.html', image: 'blutut.png', rating: '3.4', reviews: 88, desc: 'High-quality 15W Bluetooth speaker with powerful bass and LED indicator.' },
  { id: 2, name: 'Type-C Cable', price: 449, oldPrice: 599, discount: '25%', link: 'cable.html', image: 'cabal.png', rating: '4.0', reviews: 732, desc: 'Durable, high-speed, and reliable charging and sync.' },
  { id: 3, name: 'Phone Holder Stand', price: 799, oldPrice: 1299, discount: '40%', link: 'holder2.html', image: 'holder.png', rating: '4.8', reviews: 92, desc: 'Adjustable phone holder for hands-free usage.' },
  { id: 4, name: 'MI PowerBank', price: 1099, oldPrice: 1499, discount: '25%', link: 'powerbank.html', image: 'powerbank.png', rating: '4.8', reviews: 92, desc: 'Compact powerbank for anytime, anywhere charging.' },
  { id: 5, name: 'Realme Earbuds', price: 990, oldPrice: 1399, discount: '35%', link: 'RealmeEarbuds.html', image: 'newearbuds.jpg', rating: '4.8', reviews: 92, desc: 'Premium sound quality, long battery life.' },
  { id: 6, name: 'Wireless Bluetooth Headset', price: 1499, oldPrice: 1999, discount: '25%', link: 'earbuds.html', image: 'earbuds.png', rating: '4.3', reviews: 127, desc: 'Professional gaming headset with 50mm drivers.' },
  { id: 7, name: 'Smart Watch', price: 1099, oldPrice: 1500, discount: '30%', link: 'smartwatch.html', image: 'watch.png', rating: '4.2', reviews: 428, desc: 'Premium sound with stylish design.' },
  { id: 8, name: 'Xiaomi Charger (33w)', price: 999, oldPrice: 1199, discount: '20%', link: 'miadpter.html', image: 'charger.png', rating: '4.3', reviews: 4111, desc: 'Fast, safe charging at blazing speed.' },
  { id: 9, name: 'Go Pro', price: 55100, oldPrice: 88999, discount: '40%', link: 'gopro.html', image: 'gopro22.png', rating: '3.2', reviews: 298, desc: 'Premium action camera for travel.' },
  { id: 10, name: 'GALAXY S25 Screen Protector', price: 399, oldPrice: 600, discount: '40%', link: 's25protech.html', image: 'mainprotech.png', rating: '4.2', reviews: 320, desc: 'Crystal-clear protection with anti-glare tech.' },
  { id: 11, name: 'Samsung S25 Case Cover', price: 299, oldPrice: 399, discount: '45%', link: 's25case.html', image: 's25case1.png', rating: '4.2', reviews: 8723, desc: 'Ultimate protection from drops and scratches.' },
  { id: 12, name: 'Selfie Stick with Tripod', price: 699, oldPrice: 1499, discount: '40%', link: 'selfstick.html', image: 'stick1.png', rating: '3.2', reviews: 298, desc: 'Perfect selfie companion with tripod.' },
  { id: 13, name: 'Wireless Bluetooth Neckband', price: 899, oldPrice: 1499, discount: '40%', link: 'adneckband.html', image: 'neckband1.jpg', rating: '3.2', reviews: 298, desc: 'Immersive sound with long-lasting comfort.' }
];

// Render all products dynamically
function renderProducts() {
  const container = document.querySelector('.products-container');
  if (!container) {
    console.error('Products container not found!');
    return;
  }
  container.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" onclick="window.location.href='${p.link}'">
      <div class="card-image" style="position: relative;">
        <div class="discount-badge" style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 12px;">${p.discount} OFF</div>
        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div style="background: linear-gradient(135deg, #FF6B6B, #FF8E8E); display: none; align-items: center; justify-content: center; min-height: 250px; border-radius: 12px; color: white; position: relative;">
          <div style="text-align: center;">
            <div style="font-size: 100px; margin-bottom: 10px;">📷</div>
            <div>Image not available</div>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="product-title">${p.name}</div>
        <div class="rating-section">
          <div class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</div>
          <div class="rating-text">${p.rating} (${p.reviews} reviews)</div>
        </div>
        <div class="price-section">
          <span class="current-price">₹${p.price.toLocaleString()}</span>
          <span class="old-price">₹${p.oldPrice.toLocaleString()}</span>
        </div>
        <div class="product-description">${p.desc}</div>
        <div class="button-container">
          <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${p.id}, '${p.name}', ${p.price}, '${p.image}', this)">Add to Cart</button>
          <button class="buy-now" onclick="event.stopPropagation(); buyNow(${p.id}, '${p.name}', ${p.price})">Buy Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', renderProducts);
