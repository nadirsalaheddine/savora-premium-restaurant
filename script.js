/* ==========================================
   SAVORA - PREMIUM JAVASCRIPT ARCHITECTURE
   Designed & Developed for Ultra-Premium UX
=========================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PREMIUM LOADING SCREEN
    // Fades out smoothly only when all assets (images, fonts) are fully loaded.
    window.addEventListener('load', () => {
        const loader = document.getElementById('loading-screen');
        gsap.to(loader, { 
            opacity: 0, 
            duration: 1.2, 
            ease: "power2.inOut",
            onComplete: () => loader.style.display = 'none' 
        });
    });

    // 2. DARK / LIGHT MODE LOGIC
    // Remembers the user's preference using localStorage.
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlEl = document.documentElement;
    
    const savedTheme = localStorage.getItem('savora-theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('savora-theme', newTheme);
        
        // Add a satisfying little rotation to the button
        gsap.fromTo(themeToggle, { rotation: 0 }, { rotation: 360, duration: 0.5 });
    });

    // 3. APPLE-STYLE TOAST NOTIFICATIONS
    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'glass-card toast-message';
        toast.style.padding = '1rem 2rem';
        toast.style.fontWeight = '600';
        toast.innerText = message;

        toastContainer.appendChild(toast);

        // Animate In
        gsap.fromTo(toast, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );

        // Animate Out & Remove after 3 seconds
        setTimeout(() => {
            gsap.to(toast, { 
                y: -20, opacity: 0, duration: 0.4, 
                onComplete: () => toast.remove() 
            });
        }, 3000);
    }

    // 4. PREMIUM SHOPPING CART LOGIC
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-badge');
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartTrigger = document.querySelector('.cart-trigger');
    const closeCartBtn = document.querySelector('.close-btn');

    // Add to Cart Interaction
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartBadge.innerText = cartCount;
            
            // Pop animation on the badge
            gsap.fromTo(cartBadge, { scale: 1 }, { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1 });
            
            // Show Success Notification
            showToast("Item Added Successfully");
        });
    });

    // Open/Close Cart Drawer
    cartTrigger.addEventListener('click', () => {
        cartDrawer.showModal();
        gsap.fromTo(cartDrawer, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
    });

    closeCartBtn.addEventListener('click', () => {
        gsap.to(cartDrawer, { 
            x: 100, opacity: 0, duration: 0.3, 
            onComplete: () => {
                cartDrawer.close();
                gsap.set(cartDrawer, { clearProps: "all" }); // Reset props
            } 
        });
    });

    // 5. HARDWARE-ACCELERATED 3D CARD HOVER
    // Calculates mouse position to tilt the glass cards smoothly
    const productCards = document.querySelectorAll('.3d-hover');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset to normal when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = `transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)`;
        });
        
        // Remove transition during movement to prevent lag
        card.addEventListener('mouseenter', () => {
            card.style.transition = `none`;
        });
    });

    // 6. GSAP SCROLL ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Parallax
    gsap.to(".floating-elements .orb-1", {
        y: -100, x: 50, ease: "none",
        scrollTrigger: { trigger: "#home", scrub: true }
    });
    
    gsap.to(".floating-elements .orb-2", {
        y: 150, x: -50, ease: "none",
        scrollTrigger: { trigger: "#home", scrub: true }
    });

    // Staggered Fade-in for Menu Cards
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: "#menu",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // Section Titles Fade up
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });
});
