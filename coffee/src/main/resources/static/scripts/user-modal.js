
// Lógica para mostrar el usuario autenticado y el modal en el header y menú móvil

document.addEventListener('DOMContentLoaded', function () {
    // Escritorio
    const userMenu = document.getElementById('user-menu');
    const userIconBtn = document.getElementById('user-icon-btn');
    const userModal = document.getElementById('user-modal');
    const userNameShort = document.getElementById('user-name-short');
    const userFullName = document.getElementById('user-full-name');
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.querySelector('a[href="login.html"]');
  

    // Obtener el nombre del usuario autenticado del localStorage (o token)
    const token = localStorage.getItem('token');
    let username = null;
    if (token) {
        // Decodificar el JWT para extraer el nombre de usuario (sin librerías externas)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            username = payload.sub || payload.username || payload.userName || payload.name || null;
        } catch (e) {
            username = null;
        }
    }

    // Escritorio
    if (username) {
        userMenu && userMenu.classList.remove('hidden');
        userNameShort && (userNameShort.textContent = username);
        userFullName && (userFullName.textContent = username);
        loginBtn && loginBtn.classList.add('hidden');
    } else {
        userMenu && userMenu.classList.add('hidden');
        loginBtn && loginBtn.classList.remove('hidden');
    }
    if (userIconBtn) {
        userIconBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            userModal.classList.toggle('hidden');
        });
    }
    document.addEventListener('click', function (e) {
        if (userModal && !userModal.classList.contains('hidden')) {
            userModal.classList.add('hidden');
        }
    });
    userModal && userModal.addEventListener('click', function (e) { e.stopPropagation(); });
    logoutBtn && logoutBtn.addEventListener('click', function () {
       const logout = confirm('¿Estás seguro de que quieres cerrar sesión?');
       if (logout) {
           localStorage.removeItem('token');
           window.location.reload();
       } 
    });

   
});
