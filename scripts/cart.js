
//Script para actualizar el total
function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        total += price * quantity;
    });
    document.querySelector('.total-price').textContent = 'Total: $' + total.toFixed(2);
}

//--------------------------------------------------------------

//Script para el boton de quitar productos

document.querySelectorAll('.subtract-btn').forEach(button => {
    button.addEventListener('click', () => {
        const cartItem = button.closest('.cart-item');
        const quantitySpan = cartItem.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        } else {
            cartItem.remove();
        }
        updateTotal();
    });
});

//-----------------------------------------------------------------------------------------

//LLamado de la funcion para actualizar el total
updateTotal();