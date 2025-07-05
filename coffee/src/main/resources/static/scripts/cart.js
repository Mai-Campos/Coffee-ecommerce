document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');


   if (!token) {
                Swal.fire({
                    icon: 'warning',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn',
                    },
                    title: '¡Atención!',
                    text: 'Debes iniciar sesión para acceder al carrito de compras',
                    confirmButtonText: 'Iniciar sesión',
                    confirmButtonColor: '#7D5941',
                    showCloseButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login.html';
                    }
                });
                return;
            }


  fetch('/api/cart', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    },
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

    if (data.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-gray-600">Tu carrito está vacío.</p>';
      totalPriceElem.textContent = 'Total: $0.00';
      return;
    }

    data.forEach(item => {
      total += item.coffee.price * item.quantity;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item-list', 'flex', 'justify-between', 'items-center', 'p-4', 'border-b-2', 'border-gray-700');

      itemDiv.innerHTML = `
        <div class="flex items-center gap-4">
          <div>
            <h3 class="font-semibold text-lg">${item.coffee.name}</h3>
            <p class="text-primary text-lg mt-1">Cantidad: ${item.quantity}</p>
          </div>
          <img src="${item.coffee.imageUrl}" alt="${item.coffee.name}" class="w-10 h-10 object-cover border-b border-gray-300 ml-4" />
        </div>
        <div class="flex items-center justify-between gap-4 mt-2">
          <button class="btn-subtract text-red-600 font-bold text-3xl px-4 py-2 rounded cursor-pointer" data-id="${item.coffee.id}" title="Restar producto">−</button>
          <span class="font-semibold text-lg">$${(item.coffee.price * item.quantity).toFixed(2)}</span>
        </div>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    totalPriceElem.textContent = `Total: $${total.toFixed(2)}`;

    // Evento para restar cantidad
    cartItemsContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('btn-subtract')) {
        const coffeeId = event.target.getAttribute('data-id');

        fetch(`/api/cart/decrement/${encodeURIComponent(coffeeId)}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        .then(res => {
          if (!res.ok) throw new Error('No se pudo restar el producto');
          location.reload();
        })
        .catch(err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al restar el producto',
            confirmButtonColor: '#7D5941'
          });
        });
      }
    });
  })
  .catch(err => {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'No se pudo cargar el carrito',
      text: 'Intenta nuevamente más tarde.',
      confirmButtonColor: '#7D5941'
    });
  });

const realizarPedidoBtn = document.getElementById('make-order-btn');
const modal = document.getElementById('direccion-modal');
const confirmarPedidoBtn = document.getElementById('confirmar-pedido');

realizarPedidoBtn?.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Confirmar el pedido
confirmarPedidoBtn?.addEventListener('click', () => {
  const direccion = document.getElementById('direccion-input').value;

  if (!direccion.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Dirección requerida',
      text: 'Por favor, ingresa una dirección de entrega.',
      confirmButtonColor: '#7D5941'
    });
    return;
  }

  // Crear el pedido (solo enviamos la dirección como parámetro)
  fetch(`/api/orders?address=${encodeURIComponent(direccion)}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    credentials: 'include'
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al registrar el pedido');
    return res.json();
  })
  .then(order => {
    // Cerrar modal
    modal.classList.add('hidden');

    Swal.fire({
      icon: 'success',
      title: 'Pedido realizado',
      text: `Tu pedido #${order.id} fue registrado exitosamente.`,
      confirmButtonColor: '#7D5941'
    }).then(() => {
      // Recargar para reflejar carrito vacío
      window.location.reload();
    });
  })
  .catch(err => {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error al registrar el pedido',
      text: 'Intenta nuevamente más tarde.',
      confirmButtonColor: '#7D5941'
    });
  });
});
});
