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