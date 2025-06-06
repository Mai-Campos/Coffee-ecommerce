//------------------Scripts para ocultar el menu navegacion en la vista mobile-------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const informationContainer = document.getElementById("explanatory-container");
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });

    //-------------------------------------------------------------------------------------------------------------------------

    

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
