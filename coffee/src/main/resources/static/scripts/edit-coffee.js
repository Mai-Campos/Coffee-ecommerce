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
})
.catch(error => {
  console.error(error);
});

// Botón cancelar
document.addEventListener('DOMContentLoaded', () => {
    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.location.href = 'coffees-admin.html';
        });
    }
});

// Obtener el ID del café de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Cargar los datos del café y rellenar el formulario
fetch(`/api/coffee/${id}`)
    .then(res => res.json())
    .then(coffee => {
        document.getElementById('coffee-name').value = coffee.name;
        document.getElementById('coffee-price').value = coffee.price;
        document.getElementById('coffee-preparation').value = coffee.recipe;
        document.getElementById('coffee-description').value = coffee.description;
        document.getElementById('coffee-photo').src = coffee.imageUrl;
    });

document.getElementById('edit-coffee-form').addEventListener('submit', function (e) {
    e.preventDefault();

    Swal.fire({
        title: '¿Estás seguro?',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn',
            cancelButton: 'swal-cancel-btn'
        },
        text: "¿Deseas guardar los cambios?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar cambios',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('name', document.getElementById('coffee-name').value);
            formData.append('price', document.getElementById('coffee-price').value);
            formData.append('recipe', document.getElementById('coffee-preparation').value);
            formData.append('description', document.getElementById('coffee-description').value);

            const imageFile = document.getElementById('coffee-photo').files[0];
            if (imageFile) {
                formData.append('imageUrl', imageFile);
            }

            fetch(`/api/coffee/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error('No se pudo actualizar el café');

                Swal.fire({
                    icon: 'success',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn',
                    },
                    title: 'Café actualizado con éxito',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = 'coffees-admin.html';
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn',
                        cancelButton: 'swal-cancel-btn'
                    },
                    title: 'Error al guardar',
                    text: error.message
                });
            });
        }
    });
});
