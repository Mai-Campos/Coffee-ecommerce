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
  if (!user.roles.includes('ROLE_ADMIN') && !user.roles.includes('ROLE_EMPLOYEE')) {
    window.location.href = '/unauthorized.html';
    console.log(user.roles);
  }
})
.catch(error => {
  console.error(error);
});

async function fetchCoffees() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/coffee', {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener cafés');
    }

    const coffees = await response.json();
    return coffees;
  } catch (error) {
    console.error('Error al cargar los cafés:', error);
    return [];
  }
}

//Renderizar tabla
const coffeeTableBody = document.getElementById('coffee-table-body');
const addCoffeeBtn = document.getElementById('add-coffee-btn');

async function renderCoffeeTable() {
  coffeeTableBody.innerHTML = '';
  const coffees = await fetchCoffees();

  coffees.forEach(coffee => {
    const row = document.createElement('tr');

    // Checkbox checked si coffee.featured es trueA
    const isFeatured = coffee.featured === true;

    row.innerHTML = `
      <td class="border px-4 py-2">${coffee.name}</td>
      <td class="border px-4 py-2">${coffee.price}</td>
      <td class="border px-4 py-2">${coffee.description}</td>
      <td class="border px-4 py-2">
        <img src="${coffee.imageUrl}" alt="${coffee.name}" class="thumbnail-img" />
      </td>
      <td class="border px-4 py-2">${coffee.recipe || 'Preparación detallada aquí'}</td>
      <td class="border px-4 py-2">
<div class="flex flex-wrap items-center gap-2">
          <button class="edit-btn" data-id="${coffee.id}">Editar</button>
          <button class="delete-btn ml-4" data-id="${coffee.id}">Eliminar</button>
<label class="inline-flex items-center justify-center w-7 h-7 cursor-pointer ml-4 relative" title="Marcar destacado">
            <input 
              type="checkbox" 
              class="favorite-toggle hidden" 
              data-id="${coffee.id}"
              ${isFeatured ? 'checked' : ''}
            />
            <!-- Icono sin rellenar -->
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              stroke-width="2" 
              class="w-7 h-7 text-red-500 absolute top-0 left-0 heart-outline ${isFeatured ? 'hidden' : ''} transition-opacity duration-300 opacity-100"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                fill="none"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <!-- Icono relleno -->
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="red" 
              stroke="red"
              stroke-width="2"gi
              class="w-7 h-7 absolute top-0 left-0 heart-filled ${isFeatured ? '' : 'hidden'} transition-opacity duration-300 opacity-0"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </label>
        </div>
      </td>
    `;

    coffeeTableBody.appendChild(row);
  });

  // Añadir eventos a imágenes para abrir en nueva pestaña
  document.querySelectorAll('.thumbnail-img').forEach(img => {
    img.addEventListener('click', () => {
      window.open(img.src, '_blank');
    });
  });

  // Evento eliminar café
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.getAttribute('data-id');

      Swal.fire({
        title: '¿Eliminar este café?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7D5941',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteCoffee(id);
            Swal.fire({
              title: 'Eliminado',
              text: 'El café ha sido eliminado.',
              icon: 'success',
              confirmButtonColor: '#7D5941'
            });
            renderCoffeeTable(); // Refrescar tabla después de eliminar
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el café.',
              icon: 'error',
              confirmButtonColor: '#7D5941'
            });
          }
        }
      });
    });
  });

  // Evento editar café (redirección)
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      window.location.href = `edit-coffee.html?id=${id}`;
    });
  });

  // Evento marcar favorito (toggle iconos y actualizar backend)
document.querySelectorAll('.favorite-toggle').forEach(checkbox => {
  checkbox.addEventListener('change', async () => {
    const id = checkbox.getAttribute('data-id');
    const featured = checkbox.checked;

    // Contar cuántos están destacados actualmente
    const currentFeaturedCount = Array.from(document.querySelectorAll('.favorite-toggle'))
      .filter(cb => cb.checked).length;

    // Si se intenta activar y ya hay 3 destacados
    if (featured && currentFeaturedCount > 3) {
      // Revertir el checkbox
      checkbox.checked = false;

      // Mostrar alerta
      Swal.fire({
        icon: 'warning',
        title: 'Límite alcanzado',
        text: 'Solo puedes marcar hasta 3 cafés como destacados.',
        confirmButtonColor: '#7D5941'
      });
      return;
    }

    const label = checkbox.closest('label');
    const heartOutline = label.querySelector('.heart-outline');
    const heartFilled = label.querySelector('.heart-filled');

    // Mostrar/Ocultar corazones según estado
    if (featured) {
      heartOutline.classList.add('hidden');
      heartFilled.classList.remove('hidden');
    } else {
      heartOutline.classList.remove('hidden');
      heartFilled.classList.add('hidden');
    }

    // Actualizar en backend
    try {
      await fetch(`http://localhost:8080/api/coffee/${id}/featured`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featured })
      });
    } catch (error) {
      console.error('Error actualizando destacado:', error);
    }
  });
});

}

async function deleteCoffee(id) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/api/coffee/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!res.ok) {
      throw new Error('No se pudo eliminar el café');
    }

    console.log('Café eliminado con éxito');
  } catch (error) {
    console.error('Error eliminando café:', error);
  }
}

// Renderizado inicial
document.addEventListener('DOMContentLoaded', () => {
  renderCoffeeTable();
});
