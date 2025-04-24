//------------------Scripts para ocultar el menu navegacion en la vista mobile-------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
  
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      console.log("hola");
    });

    //-------------------------------------------------------------------------------------------------------------------------

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

    // Dynamic heading for explanatory section with sliding animation
    const headings = [
        "Un Café Primero",
        "Calidad y Sabor en Cada Taza",
        "Tu Tienda de Cafés en Línea",
        "Café Café Café Café!!"
    ];
    let currentIndex = 0;
    const dynamicHeading = document.getElementById('dynamic-heading');

    function slideToNextHeading() {
        // Add slide out class
        dynamicHeading.classList.add('slide-out-left');

        // After animation ends, change text and slide in
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

    // Initialize with first heading
    dynamicHeading.textContent = headings[currentIndex];

    // Change heading every 5 seconds with sliding animation
    setInterval(slideToNextHeading, 5000);
});
