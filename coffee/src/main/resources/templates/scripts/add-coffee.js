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
        photo: {
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
            if (field === "photo") {
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
            form.submit();
        }
    });
});
