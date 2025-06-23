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
     console.log(user.roles)
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
        row.innerHTML = `
            <td class="border px-4 py-2">${coffee.name}</td>
            <td class="border px-4 py-2">${coffee.price}</td>
            <td class="border px-4 py-2">${coffee.description}</td>
            <td class="border px-4 py-2">
                <img src="${coffee.imageUrl}" alt="${coffee.name}" class="thumbnail-img" />
            </td>
            <td class="border px-4 py-2">${coffee.recipe || 'Preparación detallada aquí'}</td>
            <td class="border px-4 py-2">
                <button class="edit-btn" data-id="${coffee.id}">Editar</button>
                <button class="delete-btn" data-id="${coffee.id}">Eliminar</button>
            </td>
        `;
        coffeeTableBody.appendChild(row);
    });

    document.querySelectorAll('.thumbnail-img').forEach(img => {
        img.addEventListener('click', () => {
            window.open(img.src, '_blank');
        });
    });

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
                        renderCoffeeTable(); // Actualiza la tabla después de eliminar
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

    // Editar podría redirigir o abrir un modal
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            // Redirige a la página de edición con el ID como parámetro en la URL
            window.location.href = `edit-coffee.html?id=${id}`;
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



//Renderizado inicial
document.addEventListener('DOMContentLoaded', () => {
    renderCoffeeTable();
});
