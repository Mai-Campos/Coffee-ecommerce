
//------------------Scripts para ocultar el menu navegacion en la vista mobile-------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
  
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      console.log("hola");
    });
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
