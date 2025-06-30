document.addEventListener('DOMContentLoaded', function () {
    // Escritorio
    const userMenu = document.getElementById('user-menu');
    const userIconBtn = document.getElementById('user-icon-btn');
    const userModal = document.getElementById('user-modal');
    const userNameShort = document.getElementById('user-name-short');
    const userFullName = document.getElementById('user-full-name');
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.querySelector('a[href="login.html"]');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLoginLink = mobileMenu ? mobileMenu.querySelector('a[href="login.html"]') : null;
    const mobileUserModal = document.getElementById('mobile-user-modal');
    const mobileUserMenu = document.getElementById('mobile-user-menu');
    const mobileUserName = document.getElementById('mobile-user-name');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

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

        mobileLoginLink && mobileLoginLink.classList.add('hidden');
        mobileUserMenu && mobileUserMenu.classList.remove('hidden');
        mobileUserName && (mobileUserName.textContent = username);

    } else {
        userMenu && userMenu.classList.add('hidden');
        loginBtn && loginBtn.classList.remove('hidden');

        mobileLoginLink && mobileLoginLink.classList.remove('hidden');
        mobileUserMenu && mobileUserMenu.classList.add('hidden');

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
         Swal.fire({
                title: '¿Cerrar Sesión?',
                text: 'Esta seguro que desea cerrar sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7D5941',
                cancelButtonColor: '#aaa',
                confirmButtonText: 'Sí, Cerrar Sesión',
                cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                window.location.reload();
            }
        });
    });

    mobileLogoutBtn && mobileLogoutBtn.addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro de que quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#aaa',
            
            
            customClass: {
                confirmButton: 'btn',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                window.location.reload();
            }
        });
    });

});
