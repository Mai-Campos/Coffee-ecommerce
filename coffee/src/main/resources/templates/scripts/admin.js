// Coffee data copied from details-coffe.js for in-memory CRUD operations
let coffeeData = {
    espresso: {
        name: "Café Espresso",
        price: "$5.99",
        description: "Un café intenso y aromático para los amantes del espresso.",
        image: "img/Expresso.png"
    },
    latte: {
        name: "Café Latte",
        price: "$6.49",
        description: "Suave y cremoso, perfecto para disfrutar en cualquier momento.",
        image: "img/Latte.png"
    },
    mocha: {
        name: "Café Mocha",
        price: "$6.99",
        description: "Delicioso café con chocolate para un toque dulce.",
        image: "img/Mocha.png"
    },
    americano: {
        name: "Café Americano",
        price: "$4.99",
        description: "Café suave preparado con espresso y agua caliente.",
        image: "img/Americano.png"
    },
    Frapuccino: {
        name: "Frapuccino",
        price: "$6.29",
        description: "Café espresso con leche espumada y un toque de canela.",
        image: "img/frapuccino.png"
    },
    coffeFirst: {
        name: "Café Coffee First",
        price: "$6.79",
        description: "Espresso con un toque de leche espumada y una nube de azucar",
        image: "img/Coffe First.png"
    }
};

//Renderizar tabla
const coffeeTableBody = document.getElementById('coffee-table-body');
const addCoffeeBtn = document.getElementById('add-coffee-btn');

function renderCoffeeTable() {
    coffeeTableBody.innerHTML = '';
    Object.keys(coffeeData).forEach(key => {
        const coffee = coffeeData[key];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border px-4 py-2" data-label="Nombre">${coffee.name}</td>
            <td class="border px-4 py-2" data-label="Precio">${coffee.price}</td>
            <td class="border px-4 py-2" data-label="Descripción">${coffee.description}</td>
            <td class="border px-4 py-2" data-label="Foto">
                <img src="${coffee.image}" alt="${coffee.name}" class="thumbnail-img" />
            </td>
            <td class="border px-4 py-2" data-label="Preparación">Preparación detallada aquí</td>
            <td class="border px-4 py-2" data-label="Acciones">
                <button class="edit-btn" data-key="${key}">Editar</button>
                <button class="delete-btn" data-key="${key}">Eliminar</button>
            </td>
        `;
        coffeeTableBody.appendChild(row);
    });

    // Script para abrir imagenes en navegador
    document.querySelectorAll('.thumbnail-img').forEach(img => {
        img.addEventListener('click', () => {
            window.open(img.src, '_blank');
        });
    });

    // Eventos para los botones editar y eliminar
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            alert('Funcionalidad de edición próximamente.');
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key');
            if (confirm('¿Está seguro de que desea eliminar este café?')) {
                delete coffeeData[key];
                renderCoffeeTable();
            }
        });
    });
}

//Renderizado inicial
document.addEventListener('DOMContentLoaded', () => {
    renderCoffeeTable();
});
