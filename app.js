/* ==========================================================================
   FLORABLOOM & GARLAND CRAFT - APPLICATION LOGIC (JS)
   ========================================================================== */

// Default Seed Catalog Data for Flowers & Garlands
const DEFAULT_PRODUCTS = [
  {
    id: "flower-101",
    name: "Royal Red Rose & Jasmine Wedding Garland (Pair)",
    category: "garland",
    price: 2499,
    rating: 4.9,
    reviews: 142,
    badge: "Wedding Special",
    image: "images/rose_garland.png",
    description: "Exquisite handcrafted bridal wedding garland pair made with farm-fresh Dutch red roses, aromatic jasmine, and pink lotus buds. Includes velvet protection box.",
    flowerTypes: ["Dutch Red Roses", "Madurai Jasmine", "Pink Lotus"],
    freshnessHours: "Fresh dawn harvest guaranteed"
  },
  {
    id: "flower-102",
    name: "Fresh Madurai Jasmine (Mallipoo) Hair Gajra Set",
    category: "gajra",
    price: 299,
    rating: 4.8,
    reviews: 98,
    badge: "Fresh Harvest",
    image: "images/jasmine_string.png",
    description: "Thick, highly fragrant hand-strung Madurai Jasmine (Mallipoo) floral string paired with orange marigold accents. Perfect for festive hair decoration & temple wear.",
    flowerTypes: ["Madurai Jasmine", "Golden Marigold"],
    freshnessHours: "Picked 4 hours before dispatch"
  },
  {
    id: "flower-103",
    name: "Luxury Velvet Rose & White Lily Gift Bouquet",
    category: "bouquet",
    price: 1499,
    rating: 4.9,
    reviews: 210,
    badge: "Bestseller",
    image: "images/bouquet_luxury.png",
    description: "Elegant luxury floral arrangement featuring deep velvet red roses, fragrant Casablanca lilies, and fresh eucalyptus foliage wrapped in matte rose paper with satin ribbon.",
    flowerTypes: ["Velvet Roses", "White Lilies", "Eucalyptus"],
    freshnessHours: "Vase life 5-7 days with plant food"
  },
  {
    id: "flower-104",
    name: "Grand Reception Pink Rose & Orchid Jumbo Maalai",
    category: "wedding",
    price: 3899,
    rating: 5.0,
    reviews: 64,
    badge: "Royal Collection",
    image: "images/hero_flowers.png",
    description: "Grand jumbo reception garland crafted with gradient pink roses, rare purple dendrobium orchids, and golden zari tassels. Custom length tailored for grand ceremonies.",
    flowerTypes: ["Pink Roses", "Purple Orchids", "Gold Zari"],
    freshnessHours: "Handcrafted on event morning"
  },
  {
    id: "flower-105",
    name: "Traditional Temple Pooja Lotus & Tulsi Flower Pack",
    category: "pooja",
    price: 399,
    rating: 4.7,
    reviews: 175,
    badge: "Daily Pooja",
    image: "images/rose_garland.png",
    description: "Sacred lotus flowers, sacred tulsi leaves, red hibiscus, and fresh marigold loose flower pack curated for daily home pooja and temple offerings.",
    flowerTypes: ["Pink Lotus", "Sacred Tulsi", "Hibiscus", "Marigold"],
    freshnessHours: "Direct from farm every sunrise"
  },
  {
    id: "flower-106",
    name: "Bridal Floral Veni & Hair Crown (Rose & Pearl)",
    category: "gajra",
    price: 499,
    rating: 4.9,
    reviews: 86,
    badge: "Trending",
    image: "images/jasmine_string.png",
    description: "Premium hair veni designed for brides and classical dancers, crafted with baby roses, jasmine buds, and pearl bead strands.",
    flowerTypes: ["Miniature Roses", "Jasmine", "Pearls"],
    freshnessHours: "Long-lasting freshness"
  },
  {
    id: "flower-107",
    name: "Divine Golden Marigold & Tulsi Deity Garland",
    category: "pooja",
    price: 599,
    rating: 4.8,
    reviews: 112,
    badge: "Pooja Special",
    image: "images/jasmine_string.png",
    description: "Dense 4-foot golden marigold and fragrant tulsi garland woven specifically for temple deities, housewarming ceremonies, and divine blessings.",
    flowerTypes: ["Golden Marigold", "Aromatic Tulsi"],
    freshnessHours: "Fresh dawn harvest"
  },
  {
    id: "flower-108",
    name: "Pastel Dutch Rose & Gypsophila Celebration Bouquet",
    category: "bouquet",
    price: 1799,
    rating: 4.9,
    reviews: 153,
    badge: "Luxury Gift",
    image: "images/bouquet_luxury.png",
    description: "Pastel peach and blush pink roses clustered with delicate white baby's breath (gypsophila) flowers. Perfect for anniversaries, birthdays, and congratulations.",
    flowerTypes: ["Blush Pink Roses", "Baby's Breath"],
    freshnessHours: "Vase life 5-7 days"
  }
];

// App State
let products = JSON.parse(localStorage.getItem('flora_products')) || DEFAULT_PRODUCTS;
let cart = JSON.parse(localStorage.getItem('flora_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('flora_wishlist')) || [];
let activeCategory = 'all';
let currentSearch = '';
let currentSort = 'featured';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const sortSelect = document.getElementById('sortSelect');
const categoryTabs = document.getElementById('categoryTabs');
const cartBadge = document.getElementById('cartBadge');
const wishlistBadge = document.getElementById('wishlistBadge');
const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTax = document.getElementById('cartTax');
const cartDelivery = document.getElementById('cartDelivery');
const cartGrandTotal = document.getElementById('cartGrandTotal');
const cartItemCount = document.getElementById('cartItemCount');
const deliveryProgressText = document.getElementById('deliveryProgressText');
const deliveryProgressBar = document.getElementById('deliveryProgressBar');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
  updateGarlandQuote();
});

// Event Listeners Setup
function setupEventListeners() {
  // Search Input
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    clearSearchBtn.style.display = currentSearch ? 'block' : 'none';
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.style.display = 'none';
    renderProducts();
  });

  // Sort Select
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Category Filter Tabs
  categoryTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderProducts();
  });

  // Reset Filters Button
  resetFiltersBtn.addEventListener('click', resetAllFilters);
  document.getElementById('clearFilterBtn').addEventListener('click', resetAllFilters);

  // Cart Drawer Trigger
  document.getElementById('cartDrawerBtn').addEventListener('click', openCartDrawer);

  // Wishlist Modal Trigger
  document.getElementById('wishlistBtn').addEventListener('click', openWishlistModal);

  // Add Product Modal Trigger
  document.getElementById('openAddProductBtn').addEventListener('click', () => {
    openModal('addProductModal');
  });

  // Product Form Submit
  document.getElementById('productForm').addEventListener('submit', handleAddProductSubmit);

  // Custom Garland Form Submit
  document.getElementById('customGarlandForm').addEventListener('submit', handleCustomGarlandSubmit);

  // Checkout Form Submit
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
}

// Reset All Filters
function resetAllFilters() {
  currentSearch = '';
  activeCategory = 'all';
  currentSort = 'featured';
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  sortSelect.value = 'featured';
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.category === 'all');
  });
  renderProducts();
}

// Render Products Catalog Grid
function renderProducts() {
  let filtered = [...products];

  // Category Filter
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory || (activeCategory === 'wedding' && p.badge === 'Wedding Special'));
  }

  // Search Filter
  if (currentSearch) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch)
    );
  }

  // Sorting Logic
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'popular') {
    filtered.sort((a, b) => b.reviews - a.reviews);
  }

  // Update Status Text
  resultsCount.textContent = `Showing ${filtered.length} of ${products.length} flower items`;
  resetFiltersBtn.classList.toggle('hide', activeCategory === 'all' && !currentSearch && currentSort === 'featured');

  // Clear & Populate Grid
  productGrid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hide');
    productGrid.classList.add('hide');
    return;
  }

  emptyState.classList.add('hide');
  productGrid.classList.remove('hide');

  filtered.forEach(prod => {
    const isWishlisted = wishlist.includes(prod.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='images/hero_flowers.png'">
        ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
        <button class="wishlist-card-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${prod.id}')" title="Save to Wishlist">
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>
      <div class="product-details">
        <span class="product-category-tag">${getCategoryName(prod.category)}</span>
        <h3 class="product-title">${prod.name}</h3>
        <p class="product-description">${prod.description}</p>
        
        <div class="product-meta">
          <div class="product-price">
            <span class="price-amount">₹${prod.price.toLocaleString('en-IN')}</span>
          </div>
          <div class="rating-stars">
            <i class="fa-solid fa-star"></i> <span>${prod.rating} (${prod.reviews})</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-outline" style="flex:1" onclick="openQuickView('${prod.id}')">
            <i class="fa-regular fa-eye"></i> Quick View
          </button>
          <button class="btn btn-primary" style="flex:1" onclick="addToCart('${prod.id}')">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Category Readable Name Mapping
function getCategoryName(cat) {
  const map = {
    garland: "Garlands (Maalai)",
    bouquet: "Luxury Bouquet",
    gajra: "Hair Gajra & Veni",
    pooja: "Pooja Flowers",
    wedding: "Wedding Collection"
  };
  return map[cat] || "Fresh Flowers";
}

// Cart State Operations
function addToCart(productId, qty = 1, customDetails = null) {
  let itemIndex = -1;

  if (customDetails) {
    // Custom item unique identifier
    cart.push({
      id: 'custom-' + Date.now(),
      name: customDetails.name,
      price: customDetails.price,
      image: 'images/rose_garland.png',
      qty: qty,
      details: customDetails.description
    });
  } else {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].qty += qty;
    } else {
      cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        qty: qty
      });
    }
  }

  saveCart();
  updateCartUI();
  showToast("Added to shopping bag!", "success");
}

function updateCartQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart", "info");
}

function saveCart() {
  localStorage.setItem('flora_cart', JSON.stringify(cart));
}

// Update Cart Drawer UI & Progress Bar
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.textContent = totalItems;
  cartItemCount.textContent = totalItems;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST/Packaging
  const delivery = subtotal >= 799 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + tax + delivery;

  // UI Text Updates
  cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  cartTax.textContent = `₹${tax.toLocaleString('en-IN')}`;
  cartDelivery.textContent = delivery === 0 ? "FREE" : `₹${delivery}`;
  cartGrandTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  // Free Delivery Progress Bar Target: ₹799
  const freeThreshold = 799;
  if (subtotal >= freeThreshold || subtotal === 0) {
    deliveryProgressText.innerHTML = "🎉 <strong>Congratulations!</strong> You unlocked FREE Express Delivery!";
    deliveryProgressBar.style.width = "100%";
  } else {
    const needed = freeThreshold - subtotal;
    const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
    deliveryProgressText.innerHTML = `Add <strong>₹${needed}</strong> more for FREE Express Delivery!`;
    deliveryProgressBar.style.width = `${pct}%`;
  }

  // Populate Cart Items List
  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-basket-shopping"></i></div>
        <h4>Your Shopping Bag is Empty</h4>
        <p>Explore our fresh flowers and handcrafted garlands to add items!</p>
      </div>
    `;
    return;
  }

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='images/hero_flowers.png'">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        ${item.details ? `<small style="color:var(--gold-600);font-size:0.75rem">${item.details}</small>` : ''}
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="icon-btn" onclick="removeCartItem('${item.id}')" title="Remove" style="width:32px;height:32px;font-size:0.85rem">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    cartItemsList.appendChild(el);
  });
}

function openCartDrawer() {
  cartDrawerBackdrop.classList.remove('hide');
}

function closeCartDrawer() {
  cartDrawerBackdrop.classList.add('hide');
}

// Wishlist Logic
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Removed from Wishlist", "info");
  } else {
    wishlist.push(productId);
    showToast("Saved to Wishlist! ❤️", "success");
  }

  localStorage.setItem('flora_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  wishlistBadge.textContent = wishlist.length;
}

function openWishlistModal() {
  const grid = document.getElementById('wishlistGrid');
  grid.innerHTML = '';

  const savedProducts = products.filter(p => wishlist.includes(p.id));
  if (savedProducts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1">
        <div class="empty-icon"><i class="fa-solid fa-heart-crack"></i></div>
        <h4>No Saved Flowers Yet</h4>
        <p>Click the heart icon on any flower or garland to save your favorites here!</p>
      </div>
    `;
  } else {
    savedProducts.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'wishlist-item-card';
      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}">
        <h4 style="font-size:0.9rem;margin-bottom:0.3rem">${prod.name}</h4>
        <strong style="color:var(--rose-700)">₹${prod.price}</strong>
        <div style="margin-top:0.6rem">
          <button class="btn btn-primary" style="padding:0.4rem 0.8rem;font-size:0.8rem" onclick="addToCart('${prod.id}'); closeModal('wishlistModal');">
            Move to Cart
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  openModal('wishlistModal');
}

// Custom Garland Builder Calculation Logic
function updateGarlandQuote() {
  const length = parseFloat(document.getElementById('garlandLength').value);
  document.getElementById('lengthDisplay').textContent = length;

  const thickness = document.getElementById('garlandThickness').value;
  let basePricePerFoot = 350;

  if (thickness === 'heavy') basePricePerFoot += 80;
  if (thickness === 'royal') basePricePerFoot += 160;

  const checkboxes = document.querySelectorAll('input[name="flowerCombo"]:checked');
  const flowerCountBonus = checkboxes.length * 50;

  const totalQuote = Math.round((length * basePricePerFoot * 2) + flowerCountBonus); // Pair of 2 garlands
  document.getElementById('calculatedQuote').textContent = `₹${totalQuote.toLocaleString('en-IN')}`;
}

function handleCustomGarlandSubmit(e) {
  e.preventDefault();
  const occasion = document.getElementById('garlandOccasion').options[document.getElementById('garlandOccasion').selectedIndex].text;
  const length = document.getElementById('garlandLength').value;
  const thickness = document.getElementById('garlandThickness').options[document.getElementById('garlandThickness').selectedIndex].text;

  const selectedFlowers = Array.from(document.querySelectorAll('input[name="flowerCombo"]:checked')).map(cb => cb.value);

  if (selectedFlowers.length === 0) {
    showToast("Please select at least 1 flower type for your custom garland!", "info");
    return;
  }

  const quoteText = document.getElementById('calculatedQuote').textContent.replace('₹', '').replace(/,/g, '');
  const quotePrice = parseInt(quoteText, 10);

  const customObj = {
    name: `Custom Artisanal Garland (${occasion})`,
    price: quotePrice,
    description: `Pair of ${length}ft garlands | Flowers: ${selectedFlowers.join(', ')} | ${thickness}`
  };

  addToCart(null, 1, customObj);
  openCartDrawer();
}

function scrollToCustomGarland() {
  document.getElementById('garlandBuilder').scrollIntoView({ behavior: 'smooth' });
}

// Quick View Modal Popup
function openQuickView(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  const content = document.getElementById('quickViewContent');
  content.innerHTML = `
    <div class="qv-img-wrapper">
      <img src="${prod.image}" alt="${prod.name}">
    </div>
    <div class="qv-details">
      <span class="product-category-tag">${getCategoryName(prod.category)}</span>
      <h3>${prod.name}</h3>
      <div class="qv-price">₹${prod.price.toLocaleString('en-IN')}</div>
      <p class="qv-desc">${prod.description}</p>
      
      <ul class="qv-highlights">
        <li><i class="fa-solid fa-circle-check"></i> <strong>Flower Composition:</strong> ${prod.flowerTypes ? prod.flowerTypes.join(', ') : 'Fresh Rose & Jasmine'}</li>
        <li><i class="fa-solid fa-circle-check"></i> <strong>Freshness Guarantee:</strong> ${prod.freshnessHours || 'Dawn Harvested'}</li>
        <li><i class="fa-solid fa-circle-check"></i> <strong>Delivery:</strong> Express 2-Hour Delivery in City</li>
      </ul>

      <div class="card-actions mt-4">
        <button class="btn btn-primary btn-lg btn-block" onclick="addToCart('${prod.id}'); closeModal('quickViewModal'); openCartDrawer();">
          <i class="fa-solid fa-bag-shopping"></i> Add to Bag & Checkout
        </button>
      </div>
    </div>
  `;

  openModal('quickViewModal');
}

// Add/Edit Product Modal Handlers
function syncProdImageInput() {
  const selectVal = document.getElementById('prodImageSelect').value;
  const customInput = document.getElementById('prodImageUrl');
  if (selectVal === 'custom') {
    customInput.classList.remove('hide');
    customInput.required = true;
  } else {
    customInput.classList.add('hide');
    customInput.required = false;
  }
}

function handleAddProductSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('prodName').value;
  const category = document.getElementById('prodCategory').value;
  const price = parseInt(document.getElementById('prodPrice').value, 10);
  const badge = document.getElementById('prodBadge').value || 'New Arrival';
  const rating = parseFloat(document.getElementById('prodRating').value) || 4.8;
  const desc = document.getElementById('prodDesc').value;

  const selectVal = document.getElementById('prodImageSelect').value;
  const image = selectVal === 'custom' ? document.getElementById('prodImageUrl').value : selectVal;

  const newProd = {
    id: 'user-flower-' + Date.now(),
    name,
    category,
    price,
    rating,
    reviews: 1,
    badge,
    image,
    description: desc,
    flowerTypes: ["Custom Selected Blooms"],
    freshnessHours: "Fresh dawn harvest"
  };

  products.unshift(newProd);
  localStorage.setItem('flora_products', JSON.stringify(products));

  closeModal('addProductModal');
  document.getElementById('productForm').reset();
  renderProducts();
  showToast("New Flower Product Added to Shop!", "success");
}

// Checkout Modal & Order Placement
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "info");
    return;
  }

  closeCartDrawer();

  // Populate checkout summary prices
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05);
  const delivery = subtotal >= 799 ? 0 : 99;
  const grandTotal = subtotal + tax + delivery;

  document.getElementById('chkSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('chkDelivery').textContent = delivery === 0 ? "FREE" : `₹${delivery}`;
  document.getElementById('chkGrandTotal').textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  // Default Delivery Date & Time (Tomorrow morning)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(7, 0, 0, 0);
  document.getElementById('deliveryDate').value = tomorrow.toISOString().slice(0, 16);

  openModal('checkoutModal');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;
  const city = document.getElementById('custCity').value;
  const dateVal = document.getElementById('deliveryDate').value;
  const payMethod = document.querySelector('input[name="payMethod"]:checked').value;

  const orderId = 'FLORA-' + Math.floor(10000 + Math.random() * 90000);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05);
  const delivery = subtotal >= 799 ? 0 : 99;
  const grandTotal = subtotal + tax + delivery;

  // Build Invoice Receipt HTML
  const receiptHTML = `
    <div style="margin-bottom:0.8rem">
      <strong>Customer:</strong> ${name} (${phone})<br>
      <strong>Delivery Address:</strong> ${address}, ${city}<br>
      <strong>Scheduled Date:</strong> ${new Date(dateVal).toLocaleString()}<br>
      <strong>Payment Mode:</strong> ${payMethod.toUpperCase()}
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:0.5rem;font-size:0.85rem">
      <thead>
        <tr style="border-bottom:1px solid #cbd5e1;text-align:left">
          <th style="padding:0.4rem 0">Item</th>
          <th style="padding:0.4rem 0;text-align:center">Qty</th>
          <th style="padding:0.4rem 0;text-align:right">Price</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr style="border-bottom:1px solid #f1f5f9">
            <td style="padding:0.4rem 0">${item.name}</td>
            <td style="padding:0.4rem 0;text-align:center">${item.qty}</td>
            <td style="padding:0.4rem 0;text-align:right">₹${(item.price * item.qty).toLocaleString('en-IN')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="margin-top:0.8rem;text-align:right;font-weight:700;font-size:1rem;color:var(--rose-800)">
      Grand Total Paid: ₹${grandTotal.toLocaleString('en-IN')}
    </div>
  `;

  document.getElementById('successOrderId').textContent = orderId;
  document.getElementById('receiptBox').innerHTML = receiptHTML;

  // Clear Cart & Close Modal
  cart = [];
  saveCart();
  updateCartUI();

  closeModal('checkoutModal');
  openModal('orderSuccessModal');
}

function printReceipt() {
  window.print();
}

// Modal Helpers
function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hide');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hide');
}

// Toast Notifications
function showToast(message, type = "info") {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
