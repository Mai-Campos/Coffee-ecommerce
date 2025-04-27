// On page load
document.addEventListener('DOMContentLoaded', () => {
    

    //------------------Scripts para ocultar el menu navegacion en la vista mobile-------------------------------------

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });
});