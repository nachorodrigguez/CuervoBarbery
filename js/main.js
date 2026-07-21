document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Shopping Cart Logic (localStorage integration)
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCountEl = document.querySelector('.cart-count');
    const cartDropdown = document.getElementById('cart-dropdown');

    // Inicializar carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cuervo_cart')) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;

        if (totalItems > 0) {
            cartDropdown.classList.add('has-items');
        }
    }

    updateCartCount();

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));

            // Buscar si ya existe el producto
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            localStorage.setItem('cuervo_cart', JSON.stringify(cart));
            updateCartCount();

            // Simple visual feedback
            const originalText = e.target.textContent;
            e.target.textContent = '¡Añadido!';
            e.target.style.backgroundColor = 'var(--color-primary)';
            e.target.style.color = 'var(--color-bg)';

            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--color-primary)';
            }, 1500);
        });
    });

    // 4. Form Submission (Mockup)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por reservar! Nos pondremos en contacto contigo pronto para confirmar tu turno.');
            contactForm.reset();
        });
    }
});
