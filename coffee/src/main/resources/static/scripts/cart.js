document.addEventListener('DOMContentLoaded', () => {
  
  fetch('/api/cart', {
    method: 'GET',
    credentials: 'include' 
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al cargar el carrito');
    return res.json();
  })
  .then(data => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElem = document.querySelector('.total-price');
    cartItemsContainer.innerHTML = ''; 

    let total = 0;

    data.forEach(item => {
      total += item.price * item.quantity;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('flex', 'justify-between', 'items-center', 'p-4', 'bg-white', 'rounded', 'shadow');

      itemDiv.innerHTML = `
        <div>
          <h3 class="font-semibold text-lg">${item.name}</h3>
          <p class="text-sm text-gray-600">Cantidad: ${item.quantity}</p>
        </div>
        <div class="font-semibold text-lg">$${(item.price * item.quantity).toFixed(2)}</div>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    totalPriceElem.textContent = `Total: $${total.toFixed(2)}`;
  })
  .catch(err => {
    console.error(err);
    alert('No se pudo cargar el carrito');
  });
 
});
