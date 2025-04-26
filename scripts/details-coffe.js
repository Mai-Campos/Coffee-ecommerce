// Coffee data for dynamic content
const coffeeData = {
    espresso: {
        name: "Café Espresso",
        price: "$5.99",
        description: "Un café intenso y aromático para los amantes del espresso.",
        image: "img/Expresso.png",
        recipe: `1. Muele los granos de café finamente.\n2. Coloca el café en la máquina espresso.\n3. Extrae el café durante 25-30 segundos.\n4. Sirve y disfruta.`
    },
    latte: {
        name: "Café Latte",
        price: "$6.49",
        description: "Suave y cremoso, perfecto para disfrutar en cualquier momento.",
        image: "img/Latte.png",
        recipe: `1. Prepara un espresso.\n2. Calienta y espuma la leche.\n3. Vierte la leche espumada sobre el espresso.\n4. Decora con cacao o canela si deseas.`
    },
    mocha: {
        name: "Café Mocha",
        price: "$6.99",
        description: "Delicioso café con chocolate para un toque dulce.",
        image: "img/Mocha.png",
        recipe: `1. Prepara un espresso.\n2. Añade chocolate caliente.\n3. Calienta y espuma la leche.\n4. Mezcla todo y sirve con crema batida.`
    },
    americano: {
        name: "Café Americano",
        price: "$4.99",
        description: "Café suave preparado con espresso y agua caliente.",
        image: "img/Americano.png",
        recipe: `1. Prepara un espresso.\n2. Añade agua caliente al espresso.\n3. Sirve y disfruta.`
    },
    Frapuccino: {
        name: "Frapuccino",
        price: "$6.29",
        description: "Café espresso con leche espumada y un toque de canela.",
        image: "https://cdn.shopify.com/s/files/1/0275/6089/4409/products/coffee-cup-1_1024x1024.jpg?v=1669399277",
        recipe: `1. Prepara un espresso.\n2. Calienta y espuma la leche.\n3. Vierte la leche espumada sobre el espresso.\n4. Espolvorea canela encima.`
    },
    coffeFirst: {
        name: "Café Coffee First",
        price: "$6.79",
        description: "Espresso con un toque de leche espumada.",
        image: "img/Coffe First.png",
        recipe: `1. Prepara un espresso.\n2. Añade una pequeña cantidad de leche espumada encima.\n3. Sirve y disfruta.`
    }
};



// Function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to populate coffee details
function populateCoffeeDetails(coffeeKey) {
    const coffee = coffeeData[coffeeKey];
    if (!coffee) {
        document.getElementById('details-container').innerHTML = '<p class="text-center text-red-600 text-xl mt-10">Café no encontrado.</p>';
        return;
    }
    document.getElementById('coffee-image').src = coffee.image;
    document.getElementById('coffee-image').alt = coffee.name;
    document.getElementById('coffee-name').textContent = coffee.name;
    document.getElementById('coffee-price').textContent = coffee.price;
    document.getElementById('coffee-description').textContent = coffee.description;
    document.getElementById('recipe-content').textContent = coffee.recipe;

   
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    const coffeeKey = getQueryParam('coffee');
    populateCoffeeDetails(coffeeKey);

    //------------------Scripts para ocultar el menu navegacion en la vista mobile-------------------------------------

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });


    //------------------------------------------Script para el carrito de compras------------------------------------------------------

    let count = 0;
    let countCart = document.querySelectorAll('.cart-count')
    const addButtons = document.querySelectorAll('.btn-agregar');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            
           count++;
           countCart.forEach(counted =>{
            counted.innerHTML = count;
           })
        });
    });

    //-----------------------------------------------------------------------------------------------------------------------------

});
