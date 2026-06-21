const products = [
    { id: 1, name: "Signature Wagyu", price: 120, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", desc: "Grade A5 Wagyu beef perfectly seared, served with a truffle glaze." },
    { id: 2, name: "Beluga Caviar", price: 250, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80", desc: "Exclusive selection of Beluga caviar with gold leaf accents." },
    { id: 3, name: "Truffle Linguine", price: 65, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80", desc: "Handmade pasta swirled in a creamy black truffle sauce." }
];

let cart = [];

// Elements
const grid = document.getElementById('menu-grid');
const cartOverlay = document.getElementById('cart-overlay');
const checkoutOverlay = document.getElementById('checkout-overlay');
const successOverlay = document.getElementById('success-overlay');
const cartBtn = document.getElementById('cart-btn');
const cartItems = document.getElementById('cart-items');

// 1. Render Products
products.forEach(p => {
    grid.innerHTML += `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
                <span style="color:var(--accent); font-size:1.3rem; font-family:'Playfair Display', serif;">$${p.price}</span>
                <button class="btn-secondary" style="padding:10px 20px; font-size:0.8rem;" onclick="addToCart(${p.id})">Add to Bag</button>
            </div>
        </div>
    `;
});

// 2. Cart Logic
window.addToCart = function(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

function updateCartUI() {
    cartBtn.innerText = `BAG (${cart.length})`;
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <div style="font-size: 1.1rem; margin-bottom:5px;">${item.name}</div>
                    <div style="color:var(--accent);">$${item.price}</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#888; cursor:pointer; text-transform:uppercase; font-size:0.8rem;">Remove</button>
            </div>
        `;
    });
}

// 3. Modals & Flow Control
document.getElementById('cart-btn').addEventListener('click', () => {
    cartOverlay.classList.remove('hidden');
});

document.getElementById('close-cart').addEventListener('click', () => {
    cartOverlay.classList.add('hidden');
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length === 0) {
        alert('Your bag is empty.');
        return;
    }
    cartOverlay.classList.add('hidden');
    checkoutOverlay.classList.remove('hidden');
});

document.getElementById('cancel-checkout').addEventListener('click', () => {
    checkoutOverlay.classList.add('hidden');
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    checkoutOverlay.classList.add('hidden');
    successOverlay.classList.remove('hidden');
    cart = []; // Empty cart
    updateCartUI();
});

document.getElementById('close-success').addEventListener('click', () => {
    successOverlay.classList.add('hidden');
});