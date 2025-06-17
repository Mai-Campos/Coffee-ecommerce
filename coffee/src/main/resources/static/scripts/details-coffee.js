

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


// On page load
document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8080/api/coffee/${id}`)
      .then(response => response.json())
      .then(coffee =>{
    document.getElementById('coffee-image').src = coffee.imageUrl;
    document.getElementById('coffee-image').alt = coffee.name;
    document.getElementById('coffee-name').textContent = coffee.name;
    document.getElementById('coffee-price').textContent = "$" + coffee.price;
    document.getElementById('coffee-description').textContent = coffee.description;
    document.getElementById('recipe-content').textContent = coffee.recipe;
 }).catch(error =>{
         document.getElementById('details-container').innerHTML = `<p class="text-center text-red-600 text-xl mt-10">Café no encontrado.</p>`;
         console.log(error);
        return;
 })

   

  
    
    

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
