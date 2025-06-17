//---------------------------------------------------Script para la animacion del carrusel--------------------------------------
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let index = 0;

if (!track || totalItems === 0) {
    console.error('Carousel elements not found');
}

function slideCarousel() {
    index++;
    if (index >= totalItems) {
        index = 0;
    }
    const itemWidth = items[0].offsetWidth;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
}

setInterval(slideCarousel, 5000); 

//-----------------------------------------------------------------------------------------------------------------------------------


 const headings = [
    "Un Café Primero",
    "Calidad y Sabor en Cada Taza",
    "Tu Tienda de Cafés en Línea",
    "Café Café Café Café!!"
];
let currentIndex = 0;
const dynamicHeading = document.getElementById('dynamic-heading');

function slideToNextHeading() {
   
    dynamicHeading.classList.add('slide-out-left');

    
    dynamicHeading.addEventListener('animationend', function handler() {
        dynamicHeading.removeEventListener('animationend', handler);
        dynamicHeading.classList.remove('slide-out-left');
        currentIndex = (currentIndex + 1) % headings.length;
        dynamicHeading.textContent = headings[currentIndex];
        dynamicHeading.classList.add('slide-in-right');

        dynamicHeading.addEventListener('animationend', function handler2() {
            dynamicHeading.removeEventListener('animationend', handler2);
            dynamicHeading.classList.remove('slide-in-right');
        });
    });
}


dynamicHeading.textContent = headings[currentIndex];


setInterval(slideToNextHeading, 5000);


// ---------------------------- Script para cargar tarjetas dinámicas de cafés ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const coffeeContainer = document.getElementById("coffee-container");

    fetch("http://localhost:8080/api/coffee")
        .then(res => {
            if (!res.ok) throw new Error("No se pudieron cargar los cafés.");
            return res.json();
        })
        .then(coffees => {
            coffees.forEach(coffee => {
                const card = document.createElement("div");
                card.className = "product-card bg-secundario rounded-lg shadow-md p-4 flex flex-col items-center max-w-sm";

                card.innerHTML = `
                    <img src="${coffee.imageUrl}" alt="${coffee.name}" class="w-full h-48 object-cover rounded-md mb-4">
                    <h3 class="text-title font-semibold text-xl mb-2">${coffee.name}</h3>
                    <p class="text-botones font-bold mb-4">$${parseFloat(coffee.price).toFixed(2)}</p>
                    <div class="flex space-x-4">
                    <a href="details-coffee.html?id=${coffee.id}" class="btn-detalles inline-block cursor-pointer">Ver detalles</a>
                        <button class="btn-agregar">Agregar al carrito</button>
                    </div>
                `;

                coffeeContainer.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error al cargar los cafés:", err);
        });

      
});
