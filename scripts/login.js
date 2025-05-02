const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const eyeIcon = document.querySelector('#eyeIcon');

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