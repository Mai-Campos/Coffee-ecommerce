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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-coffee-form");

    // Validaciones
    const validations = {
        name: {
            validate: (value) => value.length >= 5 && value.length <= 20,
            errorMessage: "El nombre debe tener entre 5 y 20 caracteres."
        },
        price: {
            validate: (value) => !isNaN(value) && parseFloat(value) > 0,
            errorMessage: "El precio debe ser un número mayor a 0."
        },
        img: {
            validate: (file) => {
                if (!file) return false;
                const allowedTypes = ["image/jpeg", "image/png"];
                return allowedTypes.includes(file.type);
            },
            errorMessage: "La foto debe ser un archivo JPG o PNG."
        },
        description: {
            validate: (value) => {
                const length = value.trim().length;
                return length >= 10 && length <= 50;
            },
            errorMessage: "La descripción debe tener entre 10 y 50 caracteres."
        },
        recipe: {
            validate: (value) => {
                const length = value.trim().length;
                return length >= 15 && length <= 60;
            },
            errorMessage: "La receta debe tener entre 15 y 60 caracteres."
        }
    };

    // Eliminar mensajes de error
    const clearErrors = () => {
        Object.keys(validations).forEach(field => {
            const errorElem = document.getElementById(field + "-error");
            if (errorElem) errorElem.textContent = "";
        });
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();

        let valid = true;

        // Validacion para cada campo
        Object.keys(validations).forEach(field => {
            let value;
            if (field === "img") {
                const input = document.getElementById(field);
                value = input.files[0];
            } else {
                value = document.getElementById(field).value.trim();
            }
            if (!validations[field].validate(value)) {
                const errorElem = document.getElementById(field + "-error");
                if (errorElem) errorElem.textContent = validations[field].errorMessage;
                valid = false;
            }
        });

        if (valid) {
            const formData = new FormData();

            formData.append("name", document.getElementById("name").value.trim());
            formData.append("price", document.getElementById("price").value.trim());
            formData.append("description", document.getElementById("description").value.trim());
            formData.append("recipe", document.getElementById("recipe").value.trim());
            formData.append("img", document.getElementById("img").files[0]);

            fetch("http://localhost:8080/api/coffee/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: formData
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error al guardar el café");
                }
                return res.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Café agregado!',
                    text: 'El café se agregó exitosamente.',
                    confirmButtonColor: '#7D5941'
                });
                form.reset();
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al agregar el café.',
                    confirmButtonColor: '#7D5941'
                });
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campos inválidos',
                text: 'Por favor, corrige los errores en el formulario.',
                confirmButtonColor: '#7D5941'
            });
        }
    });
});
