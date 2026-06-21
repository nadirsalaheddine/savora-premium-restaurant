/* ==========================================================
   1. PREMIUM MOCK DATA (قاعدة بيانات المنتجات الفاخرة)
   ========================================================== */
   const products = [
    { id: 1, name: "Gold Leaf Truffle Burger", category: "Burgers", price: 45.00, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", desc: "Wagyu beef, black truffle, 24k gold leaf." },
    { id: 2, name: "Smoked Brisket Burger", category: "Burgers", price: 35.00, image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=80", desc: "12-hour smoked brisket, aged cheddar." },
    { id: 3, name: "Burrata & Caviar Pizza", category: "Pizza", price: 65.00, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80", desc: "Fresh burrata, beluga caviar, gold flakes." },
    { id: 4, name: "Truffle Mushroom Pasta", category: "Pasta", price: 40.00, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80", desc: "Handmade fettuccine, wild mushrooms, cream." },
    { id: 5, name: "Wagyu Tomahawk Steak", category: "Grills", price: 150.00, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80", desc: "Grade A5 Wagyu, rosemary infusion." },
    { id: 6, name: "Royal Saffron Dessert", category: "Desserts", price: 25.00, image: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?auto=format&fit=crop&w=500&q=80", desc: "Saffron infused cream, edible flowers." }
];

/* ==========================================================
   2. GLOBAL VARIABLES & DOM ELEMENTS
   ========================================================== */
let cart = [];
const deliveryFee = 5.00;

// Elements
const productsGrid = document.getElementById('products-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOpenBtn = document.getElementById('cart-open-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const themeToggle = document.getElementById('theme-toggle');
const categoryBtns = document.querySelectorAll('.cat-btn');
const toast = document.getElementById('toast-notification');

/* ==========================================================
   3. INITIALIZE STORE (تشغيل المتجر)
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // عرض كل المنتجات في البداية
    renderProducts(products);
    
    // تفعيل المود الليلي الافتراضي
    document.body.classList.add('dark-mode');
});

/* ==========================================================
   4. RENDER PRODUCTS (عرض الماكلة في الشاشة)
   ========================================================== */
function renderProducts(items) {
    productsGrid.innerHTML = ''; // تنظيف الشاشة

    if(items.length === 0) {
        productsGrid.innerHTML = `<p style="text-align:center; width:100%; opacity:0.5;">No items found in this category.</p>`;
        return;
    }

    items.forEach(item => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'glass-panel', '3d-hover');
        productCard.innerHTML = `
            <div style="height: 200px; overflow: hidden; border-radius: 20px 20px 0 0;">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
            </div>
            <div style="padding: 20px;">
                <h3 style="font-family: 'Syne', sans-serif; font-size: 1.2rem; margin-bottom: 5px;">${item.name}</h3>
                <p style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 15px;">${item.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 700; color: var(--accent-gold); font-size: 1.2rem;">$${item.price.toFixed(2)}</span>
                    <button class="btn-primary" onclick="addToCart(${item.id})" style="padding: 8px 20px; font-size: 0.9rem;">Add +</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

/* ==========================================================
   5. FILTER CATEGORIES (فرز القوائم)
   ========================================================== */
categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // نزع التفعيل من كل الأزرار
        categoryBtns.forEach(b => b.classList.remove('active'));
        // تفعيل الزر المضغوط
        e.target.classList.add('active');
        
        const category = e.target.getAttribute('data-cat');
        const filteredProducts = products.filter(p => p.category === category);
        
        renderProducts(filteredProducts);
    });
});

/* ==========================================================
   6. CART LOGIC (نظام السلة الذكي)
   ========================================================== */
// فتح وإغلاق السلة
cartOpenBtn.addEventListener('click', () => cartDrawer.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('open'));

// إضافة منتج للسلة
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast();
}

// تحديث واجهة السلة والحسابات
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItemEl = document.createElement('div');
        cartItemEl.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--glass-border);";
        cartItemEl.innerHTML = `
            <div>
                <h4 style="font-size: 0.95rem;">${item.name}</h4>
                <span style="color: var(--accent-gold); font-size: 0.9rem;">$${item.price.toFixed(2)} x ${item.quantity}</span>
            </div>
            <button onclick="removeFromCart(${index})" style="background: transparent; border: none; color: red; cursor: pointer; font-size: 1.2rem;">🗑️</button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartCount.innerText = totalItems;
    cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;
    
    // حساب المجموع النهائي مع التوصيل
    if(subtotal > 0) {
        cartTotal.innerText = `$${(subtotal + deliveryFee).toFixed(2)}`;
    } else {
        cartTotal.innerText = `$0.00`;
    }
}

// إزالة منتج من السلة
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/* ==========================================================
   7. LUXURY TOAST NOTIFICATION (إشعار الإضافة)
   ========================================================== */
function showToast() {
    toast.style.cssText = "position: fixed; bottom: 30px; right: 30px; background: var(--accent-gold); color: #000; padding: 15px 25px; border-radius: 50px; font-weight: bold; z-index: 9999; box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4); transform: translateY(100px); opacity: 0; transition: all 0.4s ease;";
    toast.classList.remove('hidden');
    
    // Animation In
    setTimeout(() => {
        toast.style.transform = "translateY(0)";
        toast.style.opacity = "1";
    }, 10);

    // Animation Out
    setTimeout(() => {
        toast.style.transform = "translateY(100px)";
        toast.style.opacity = "0";
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 3000);
}

/* ==========================================================
   8. DARK / LIGHT MODE TOGGLE (مفتاح الإضاءة)
   ========================================================== */
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if(document.body.classList.contains('dark-mode')) {
        themeToggle.innerText = '☀️';
    } else {
        themeToggle.innerText = '🌙';
    }
});