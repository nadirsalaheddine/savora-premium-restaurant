/**
 * Savora — Ultra-Premium Core Engine
 * Architecture: Modular Vanilla ES6+ & Interaction Logic
 * Developed by: Nadir Salaheddine (2026)
 * Strictly Minimalist - Zero Emojis in Web Output
 */

// ==========================================
// 1. MOCK PREMIUM DATA SYSTEM (DATABASE)
// ==========================================
const SAVORA_PRODUCTS = [
    { id: "b1", name: "Imperial Wagyu Burger", category: "burger", price: 45.00, rating: 4.9, tags: ["popular", "chef-recommendation"], desc: "Aged Japanese Wagyu, infused black truffle butter, artisanal brioche.", img: "burger-1.jpg" },
    { id: "b2", name: "Royal Truffle Sensation", category: "burger", price: 38.00, rating: 4.8, tags: ["best-seller"], desc: "Prime Angus beef, fresh shaved truffles, melted gruyere layer.", img: "burger-2.jpg" },
    { id: "p1", name: "Caviar Smoked Pizza", category: "pizza", price: 65.00, rating: 5.0, tags: ["chef-recommendation", "newest"], desc: "Ossetra caviar, organic crème fraîche, edible 24k gold leaf.", img: "pizza-1.jpg" },
    { id: "p2", name: "Burrata Heirloom Crust", category: "pizza", price: 32.00, rating: 4.7, tags: ["popular"], desc: "Creamy artisanal burrata, wild basil extract, cold-pressed olive oil.", img: "pizza-2.jpg" },
    { id: "pa1", name: "Saffron Lobster Fettuccine", category: "pasta", price: 55.00, rating: 4.9, tags: ["best-seller", "chef-recommendation"], desc: "Fresh hand-rolled pasta, blue lobster tail, Iranian saffron broth.", img: "pasta-1.jpg" },
    { id: "g1", name: "Tomahawk Prime Gold", category: "grills", price: 120.00, rating: 5.0, tags: ["chef-recommendation"], desc: "Dry-aged master cut steak, wrapped in premium gold leaf foil.", img: "grills-1.jpg" }
];

// ==========================================
// 2. GLOBAL SYSTEM STATE
// ==========================================
let cart = JSON.parse(localStorage.getItem("savora_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("savora_wishlist")) || [];
let activeCurrency = "USD";
let currencyRates = { USD: 1, EUR: 0.92, DZD: 135.00 };
let currencySymbols = { USD: "$", EUR: "€", DZD: "DA" };

// ==========================================
// 3. CORE INITIALIZATION ENGINE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initLoadingScreen();
    initThemeEcosystem();
    initDynamicRendering();
    initSearchEngine();
    initComponentInteractions();
    initCartAndWishlistCore();
    checkRestaurantStatus();
    initCountdownTimer();
});

// ==========================================
// 4. PREMIUM LOADING EXPERIENCER (GSAP-like)
// ==========================================
function initLoadingScreen() {
    const loader = document.getElementById("loading-screen");
    if (!loader) return;
    
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s ease";
            loader.style.opacity = "0";
            loader.style.transform = "scale(1.02)";
            setTimeout(() => loader.classList.add("hidden"), 800);
        }, 1200);
    });
}

// ==========================================
// 5. INTUITIVE THEME CONTROL (LIGHT / DARK)
// ==========================================
function initThemeEcosystem() {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const storedTheme = localStorage.getItem("savora_theme") || "light";

    if (storedTheme === "dark") body.classList.add("dark");

    toggleBtn?.addEventListener("click", () => {
        body.classList.toggle("dark");
        const isDark = body.classList.contains("dark");
        localStorage.setItem("savora_theme", isDark ? "dark" : "light");
        showToast(isDark ? "Dark theme activated" : "Light theme activated", "info");
    });
}

// ==========================================
// 6. DYNAMIC PRODUCTS GENERATION & FILTERING
// ==========================================
function initDynamicRendering() {
    const productsContainer = document.getElementById("category-products-container");
    const tabButtons = document.querySelectorAll(".category-tab");
    const menuFilterButtons = document.querySelectorAll(".menu-filter-btn");
    const menuSorter = document.getElementById("menu-sorter");

    function renderItems(filteredItems) {
        if (!productsContainer) return;
        if (filteredItems.length === 0) {
            productsContainer.innerHTML = `
                <div class="col-span-full text-center py-16 opacity-60">
                    <p class="font-heading text-lg">No culinary pieces match your query.</p>
                </div>`;
            return;
        }

        productsContainer.innerHTML = filteredItems.map(item => {
            const isFav = wishlist.some(fav => fav.id === item.id);
            const currentPrice = (item.price * currencyRates[activeCurrency]).toFixed(2);
            const symbol = currencySymbols[activeCurrency];

            return `
                <article class="product-glass-card group" data-item-id="${item.id}">
                    <div class="relative overflow-hidden rounded-2xl aspect-square mb-4 bg-zinc-100 dark:bg-zinc-900">
                        <img src="${item.img}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <button class="favorite-btn absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-sm z-10 transition-colors" data-fav-id="${item.id}" aria-label="Wishlist">
                            <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-current'}"></i>
                        </button>
                    </div>
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-heading text-lg font-bold leading-tight">${item.name}</h4>
                        <span class="text-xs font-semibold px-2 py-1 bg-luxury-gold/10 text-luxury-gold rounded-md flex items-center gap-1">
                            ${item.rating}
                        </span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">${item.desc}</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="font-heading font-bold text-lg">${symbol}${currentPrice}</span>
                        <button class="btn-add-to-cart bg-luxury-charcoal text-white dark:bg-luxury-warm-white dark:text-luxury-charcoal text-xs font-medium px-4 py-2 rounded-full transition-transform active:scale-95 hover:bg-luxury-gold hover:text-luxury-charcoal" data-cart-id="${item.id}">
                            Add To Cart
                        </button>
                    </div>
                </article>
            `;
        }).join("");
        if (window.lucide) lucide.createIcons();
    }

    // Tab Activation Setup
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active", "border-b-2", "border-luxury-gold"));
            btn.classList.add("active");
            const cat = btn.getAttribute("data-category");
            renderItems(SAVORA_PRODUCTS.filter(p => p.category === cat));
        });
    });

    // Filtering Setup
    menuFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            menuFilterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const tag = btn.getAttribute("data-filter");
            const items = tag === "all" ? SAVORA_PRODUCTS : SAVORA_PRODUCTS.filter(p => p.tags.includes(tag));
            renderItems(items);
        });
    });

    // Sorting Setup
    menuSorter?.addEventListener("change", (e) => {
        let sorted = [...SAVORA_PRODUCTS];
        if (e.target.value === "price-low") sorted.sort((a, b) => a.price - b.price);
        if (e.target.value === "price-high") sorted.sort((a, b) => b.price - a.price);
        if (e.target.value === "rating") sorted.sort((a, b) => b.rating - a.rating);
        renderItems(sorted);
    });

    // Render Initial State
    renderItems(SAVORA_PRODUCTS.filter(p => p.category === "burger"));
}

// ==========================================
// 7. IPHONE INSPIRED SEARCH ARCHITECTURE
// ==========================================
function initSearchEngine() {
    const searchInput = document.getElementById("global-search");
    const suggestions = document.getElementById("search-suggestions");

    searchInput?.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            suggestions?.classList.add("hidden");
            return;
        }

        const matches = SAVORA_PRODUCTS.filter(p => p.name.toLowerCase().includes(query));
        if (matches.length > 0 && suggestions) {
            suggestions.innerHTML = matches.map(m => `
                <div class="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors border-b border-neutral-100 dark:border-neutral-900 flex justify-between" data-search-target="${m.id}">
                    <span class="font-medium text-sm">${m.name}</span>
                    <span class="text-xs text-luxury-gold">${currencySymbols[activeCurrency]}${m.price}</span>
                </div>
            `).join("");
            suggestions.classList.remove("hidden");
        } else {
            suggestions?.classList.add("hidden");
        }
    });

    document.addEventListener("click", (e) => {
        if (!searchInput?.contains(e.target) && !suggestions?.contains(e.target)) {
            suggestions?.classList.add("hidden");
        }
    });
}

// ==========================================
// 8. LUXURY SYSTEM CORE (CART & WISHLIST)
// ==========================================
function initCartAndWishlistCore() {
    // Event Delegation Strategy for Add to Cart and Wishlist triggers
    document.addEventListener("click", (e) => {
        const cartBtn = e.target.closest(".btn-add-to-cart");
        const favBtn = e.target.closest(".favorite-btn");

        if (cartBtn) {
            const id = cartBtn.getAttribute("data-cart-id");
            addToCart(id);
        }
        if (favBtn) {
            const id = favBtn.getAttribute("data-fav-id");
            toggleWishlist(id, favBtn);
        }
    });

    // Currency Switcher
    const currencySwitcher = document.getElementById("currency-switcher");
    currencySwitcher?.addEventListener("change", (e) => {
        activeCurrency = e.target.value;
        initDynamicRendering();
        updateCartUi();
    });
}

function addToCart(id) {
    const item = SAVORA_PRODUCTS.find(p => p.id === id);
    if (!item) return;

    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("savora_cart", JSON.stringify(cart));
    updateCartUi();
    showToast("Masterpiece added to assortment", "success");
}

function toggleWishlist(id, element) {
    const index = wishlist.findIndex(w => w.id === id);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast("Removed from desired masterpieces", "info");
    } else {
        const item = SAVORA_PRODUCTS.find(p => p.id === id);
        wishlist.push(item);
        showToast("Saved to desired masterpieces", "success");
    }
    localStorage.setItem("savora_wishlist", JSON.stringify(wishlist));
    updateWishlistUi();
    
    const icon = element.querySelector("i");
    if (icon) {
        icon.classList.toggle("fill-red-500");
        icon.classList.toggle("text-red-500");
    }
}

function updateCartUi() {
    const countBadge = document.getElementById("cart-count");
    const cartOutput = document.getElementById("cart-items-output");
    
    const totalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    if (countBadge) countBadge.textContent = totalCount;

    if (!cartOutput) return;

    if (cart.length === 0) {
        cartOutput.innerHTML = `
            <div class="text-center py-12 opacity-50">
                <p>Your luxurious assortment is empty.</p>
            </div>`;
        updateFinancials(0);
        return;
    }

    cartOutput.innerHTML = cart.map(item => {
        const priceValue = (item.price * currencyRates[activeCurrency] * item.quantity).toFixed(2);
        const symbol = currencySymbols[activeCurrency];
        return `
            <div class="flex items-center gap-4 py-4 border-b border-neutral-100 dark:border-neutral-900">
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img src="${item.img}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h5 class="text-sm font-bold">${item.name}</h5>
                    <span class="text-xs text-neutral-400">${symbol}${(item.price * currencyRates[activeCurrency]).toFixed(2)}</span>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs" onclick="adjustQty('${item.id}', -1)">-</button>
                        <span class="text-xs font-semibold">${item.quantity}</span>
                        <button class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs" onclick="adjustQty('${item.id}', 1)">+</button>
                    </div>
                </div>
                <span class="font-bold text-sm">${symbol}${priceValue}</span>
            </div>
        `;
    }).join("");

    const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    updateFinancials(subtotal);
}

window.adjustQty = function(id, amount) {
    const target = cart.find(c => c.id === id);
    if (!target) return;

    target.quantity += amount;
    if (target.quantity <= 0) {
        cart = cart.filter(c => c.id !== id);
    }
    localStorage.setItem("savora_cart", JSON.stringify(cart));
    updateCartUi();
};

function updateFinancials(subtotalBase) {
    const rate = currencyRates[activeCurrency];
    const symbol = currencySymbols[activeCurrency];

    const subtotal = subtotalBase * rate;
    const delivery = subtotalBase > 0 ? 15.00 * rate : 0;
    const tax = subtotal * 0.10; 
    const grandTotal = subtotal + delivery + tax;

    document.getElementById("calc-subtotal").textContent = `${symbol}${subtotal.toFixed(2)}`;
    document.getElementById("calc-delivery").textContent = `${symbol}${delivery.toFixed(2)}`;
    document.getElementById("calc-tax").textContent = `${symbol}${tax.toFixed(2)}`;
    document.getElementById("calc-grandtotal").textContent = `${symbol}${grandTotal.toFixed(2)}`;
}

function updateWishlistUi() {
    const countBadge = document.getElementById("wishlist-count");
    if (countBadge) countBadge.textContent = wishlist.length;
}

// ==========================================
// 9. OVERLAY PORTALS AND INTERACTION HANDLERS
// ==========================================
function initComponentInteractions() {
    const cartTrigger = document.getElementById("cart-trigger");
    const cartDrawer = document.getElementById("shopping-cart-drawer");
    const closeCart = document.getElementById("close-cart");

    const checkoutTrigger = document.getElementById("proceed-to-checkout-btn");
    const checkoutPortal = document.getElementById("checkout-portal-drawer");
    const closeCheckout = document.getElementById("close-checkout");

    const resTrigger = document.querySelectorAll("a[href='#reservation']");
    const resPortal = document.getElementById("reservation-portal-modal");
    const closeRes = document.getElementById("close-reservation");

    // Drawer System Utility Toggles
    cartTrigger?.addEventListener("click", () => cartDrawer?.classList.toggle("hidden"));
    closeCart?.addEventListener("click", () => cartDrawer?.classList.add("hidden"));

    checkoutTrigger?.addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Your selection matrix is empty", "error");
            return;
        }
        checkoutPortal?.classList.remove("hidden");
    });
    closeCheckout?.addEventListener("click", () => checkoutPortal?.classList.add("hidden"));

    resTrigger.forEach(el => el.addEventListener("click", (e) => {
        e.preventDefault();
        resPortal?.classList.remove("hidden");
    }));
    closeRes?.addEventListener("click", () => resPortal?.classList.add("hidden"));

    // Secure Payment fields dynamic presentation strategy
    const payCardRadio = document.getElementById("pay-card");
    const payCodRadio = document.getElementById("pay-cod");
    const secureFields = document.getElementById("secure-card-fields");

    document.getElementsByName("payment_gateway").forEach(radio => {
        radio.addEventListener("change", () => {
            if (payCardRadio?.checked) secureFields?.classList.remove("hidden");
            else secureFields?.classList.add("hidden");
        });
    });

    // Form Interceptions
    document.getElementById("savora-premium-contact")?.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Inquiry successfully processed through network pipeline", "success");
        e.target.reset();
    });

    document.getElementById("reservation-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        resPortal?.classList.add("hidden");
        showToast("Exclusive reservation secured successfully", "success");
        e.target.reset();
    });
}

// ==========================================
// 10. REAL-TIME RESTAURANT STATUS TRACKER
// ==========================================
function checkRestaurantStatus() {
    const currentHour = new Date().getHours();
    const badge = document.getElementById("current-status-badge");
    if (!badge) return;

    if (currentHour >= 11 && currentHour < 23) {
        badge.textContent = "Open Now";
        badge.className = "text-xs font-bold px-3 py-1 bg-green-500/10 text-green-500 rounded-full";
    } else {
        badge.textContent = "Closed";
        badge.className = "text-xs font-bold px-3 py-1 bg-red-500/10 text-red-500 rounded-full";
    }
}

// ==========================================
// 11. REVOLUTIONARY TOAST NOTIFICATION HUB
// ==========================================
function showToast(message, type = "success") {
    const hub = document.getElementById("toast-notification-hub");
    if (!hub) return;

    const toast = document.createElement("div");
    toast.className = `premium-glass px-6 py-4 rounded-2xl shadow-xl border-l-4 transform translate-y-4 opacity-0 transition-all duration-500 ease-out flex items-center gap-3 text-sm font-medium text-luxury-dark-gray dark:text-white`;
    
    if (type === "success") toast.classList.add("border-l-luxury-gold");
    if (type === "error") toast.classList.add("border-l-luxury-orange");
    if (type === "info") toast.classList.add("border-l-neutral-400");

    toast.textContent = message;
    hub.appendChild(toast);

    // Dynamic Execution Layout Sequence
    setTimeout(() => {
        toast.classList.remove("translate-y-4", "opacity-0");
    }, 50);

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y--4");
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ==========================================
// 12. COUNTDOWN TIMER CORE MANAGEMENT
// ==========================================
function initCountdownTimer() {
    const timerContainer = document.querySelector(".countdown-timer");
    if (!timerContainer) return;

    const targetDate = new Date(timerContainer.getAttribute("data-endtime") || "2026-12-31T23:59:59").getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(interval);
            timerContainer.innerHTML = "Offer Expired";
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl) dEl.textContent = d < 10 ? "0" + d : d;
        if (hEl) hEl.textContent = h < 10 ? "0" + h : h;
        if (mEl) mEl.textContent = m < 10 ? "0" + m : m;
        if (sEl) sEl.textContent = s < 10 ? "0" + s : s;
    }, 1000);
}