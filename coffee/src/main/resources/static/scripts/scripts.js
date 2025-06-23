document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });

    //-------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------Script para el carrito de compras------------------------------------------------------

    

    const countCart = document.querySelectorAll('.cart-count');

    fetch('/api/cart', {
        
        method: 'GET',
        headers:{
            authorization: 'Bearer ' + localStorage.getItem('token') 
        },
        credentials: 'include'
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al cargar el carrito');
        return res.json();
    })
    .then(data => {
        let totalCount = 0;
        data.forEach(item => {
            totalCount += item.quantity;
        });
        countCart.forEach(counted => {
            counted.textContent = totalCount;
        });
    })
    .catch(err => {
        console.error(err);
    });

    //-----------------------------------------------------------------------------------------------------------------------------

   
});
