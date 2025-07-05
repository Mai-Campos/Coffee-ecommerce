// --- Protección de acceso por rol ---
const token = localStorage.getItem('token');

fetch('http://localhost:8080/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(res => {
  if (!res.ok) {
    window.location.href = '/login.html';
    throw new Error('No autorizado');
  }
  return res.json();
})
.then(user => {
  if (!user.roles.includes('ROLE_ADMIN') && !user.roles.includes("ROLE_EMPLOYEE")) {
     window.location.href = '/unauthorized.html'; 
  }
  loadOrders(); // Llamamos al cargar usuario si es válido
})
.catch(error => {
  console.error(error);
});


//Cargar los pedidos
function loadOrders() {
  const ordersTableBody = document.getElementById('orders-table-body');

  fetch('http://localhost:8080/api/orders/admin', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(orders => {
    ordersTableBody.innerHTML = '';

    orders.forEach(order => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="px-6 py-4">${order.id}</td>
        <td class="px-6 py-4">${order.user?.email ?? 'Sin nombre'}</td>
        <td class="px-6 py-4">
          <ul>
            ${order.orderItems.map(item => `
              <li>${item.coffee.name} x${item.quantity}</li>
            `).join('')}
          </ul>
        </td>
        <td class="px-6 py-4">$${order.totalPrice.toFixed(2)}</td>
          <td class="px-6 py-4 ">${order.address}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    <button class="complete-btn btn" data-id="${order.id}">Completado</button>
  </td>
      `;
      ordersTableBody.appendChild(tr);
    });

    //Marcar como completadas
   document.querySelectorAll('.complete-btn').forEach(button => {
  button.addEventListener('click', e => {
    const id = e.target.getAttribute('data-id');

    Swal.fire({
      title: '¿Desea marcar este pedido como completado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7D5941',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, completar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(id);
      }
    });
  });
});
  })
  .catch(error => {
    console.error('Error al cargar pedidos:', error);
  });
}

function deleteOrder(id) {
  fetch(`http://localhost:8080/api/orders/admin/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('No se pudo eliminar el pedido');
    loadOrders(); 
  })
  .catch(error => {
    console.error('Error al eliminar pedido:', error);
  });
}
