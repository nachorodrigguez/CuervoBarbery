document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar el carrito desde localStorage
    const cartItemsContainer = document.getElementById('order-items');
    const subtotalEl = document.getElementById('subtotal-amount');
    const totalEl = document.getElementById('total-amount');
    
    let cart = JSON.parse(localStorage.getItem('cuervo_cart')) || [];
    
    function renderOrderSummary() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            subtotalEl.innerText = '$0.00';
            totalEl.innerText = '$0.00';
            document.getElementById('mock-pay-btn').style.display = 'none';
            return;
        }

        let html = '';
        let total = 0;
        
        cart.forEach(item => {
            html += `
                <div class="order-item">
                    <div class="item-info">
                        <strong>${item.name}</strong>
                        <span>Cantidad: ${item.quantity}</span>
                    </div>
                    <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
            total += item.price * item.quantity;
        });
        
        cartItemsContainer.innerHTML = html;
        subtotalEl.innerText = '$' + total.toFixed(2);
        totalEl.innerText = '$' + total.toFixed(2);
    }
    
    renderOrderSummary();

    // 2. Configuración de Mercado Pago (Mock / Preparación)
    
    // NOTA: Para una integración real, se requiere tu Public Key de Mercado Pago
    // const mp = new MercadoPago('YOUR_PUBLIC_KEY', { locale: 'es-AR' });

    /* 
    Lógica real esperada:
    1. El usuario llena el formulario.
    2. Al clickear "Pagar", enviamos los datos del carrito a nuestro Backend (Node.js/PHP).
    3. El Backend crea una "Preferencia" en MP y nos devuelve el `preference_id`.
    4. Con ese ID, inyectamos el Checkout Pro o Bricks aquí:
    
    mp.bricks().create("wallet", "wallet_container", {
        initialization: {
            preferenceId: "ID_DEVUELTO_POR_BACKEND",
        },
    });
    */

    // Como estamos en un entorno HTML estático sin credenciales reales, 
    // activaremos un botón de Mock que simule el éxito del pago.
    
    if(cart.length > 0) {
        const mockPayBtn = document.getElementById('mock-pay-btn');
        mockPayBtn.style.display = 'block';
        
        mockPayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const form = document.getElementById('checkout-form');
            if(!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Simular carga de pago
            mockPayBtn.textContent = 'Procesando pago...';
            mockPayBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                window.location.href = 'success.html';
            }, 1500);
        });
    }
});
