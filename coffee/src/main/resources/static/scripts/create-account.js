//---------------------------Boton para ocultar y mostrar contraseña en campo password------------------------------------------------------

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const eyeIcon = document.querySelector('#eyeIcon');

const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPassword = document.querySelector('#confirm-password');
const eyeIconConfirm = document.querySelector('#eyeIconConfirm');

togglePassword.addEventListener('click', function () {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // toggle the eye icon fill
    if (type === 'password') {
        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />' +
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
    } else {
        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.434m1.766-1.766A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.232 2.364M15 12a3 3 0 11-6 0 3 3 0 016 0z" />' +
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />';
    }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------


//---------------------------Boton para ocultar y mostrar contraseña en campo repetir password------------------------------------------------------
toggleConfirmPassword.addEventListener('click', function () {
    // toggle the type attribute
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);

    // toggle the eye icon fill
    if (type === 'password') {
        eyeIconConfirm.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />' +
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
    } else {
        eyeIconConfirm.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.434m1.766-1.766A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.232 2.364M15 12a3 3 0 11-6 0 3 3 0 016 0z" />' +
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />';
    }
});

//---------------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------Validaciones------------------------------------------------------------------------


const sendBtn = document.getElementById("send-btn");
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passworReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*.?&])([A-Za\d$@$!%*.?%]|[^ ]){8,15}$/;

sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userNameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    // Nombre de usuario
    if (userNameInput.value.length < 3 || userNameInput.value.length > 15) {
        document.getElementById("usernameError").classList.remove("hidden");
        return;
    } else {
        document.getElementById("usernameError").classList.add("hidden");
    }

    // Email
    if (emailInput.value.length < 5 || !emailInput.value.match(emailReg)) {
        document.getElementById("emailError").classList.remove("hidden");
        return;
    } else {
        document.getElementById("emailError").classList.add("hidden");
    }

    // Password
    if (!passwordInput.value.match(passworReg)) {
        document.getElementById("passwordError").classList.remove("hidden");
        return;
    } else {
        document.getElementById("passwordError").classList.add("hidden");
    }

    // Repetir password
    if (confirmPasswordInput.value !== passwordInput.value) {
        document.getElementById("confirmPasswordError").classList.remove("hidden");
        return;
    } else {
        document.getElementById("confirmPasswordError").classList.add("hidden");
    }

    // Petición al backend
    fetch('http://localhost:8080/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    })
})
    .then(async response => {
        if (response.ok) {
            Swal.fire({
                title: '¡Registro exitoso!',
                text: 'Tu cuenta ha sido creada correctamente.',
                icon: 'success',
                confirmButtonColor: '#7D5941'
            }).then(() => {
                window.location.href = 'login.html';
            });
        } else {
            const errorText = await response.text();
            Swal.fire({
                title: 'Error al crear la cuenta',
                text: errorText || 'No se pudo crear la cuenta',
                icon: 'error',
                confirmButtonColor: '#7D5941'
            });
        }
    })
});

//---------------------------------------------------------------------------------------------------------------------------------------------------
















