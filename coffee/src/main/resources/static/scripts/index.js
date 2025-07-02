// ---------------------- CARRUSEL DINÁMICO DE DESTACADOS ----------------------
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel-track');

    if (!track) {
        console.error('No se encontró el contenedor del carrusel');
        return;
    }

    fetch("http://localhost:8080/api/coffee/featured")
        .then(res => {
            if (!res.ok) throw new Error("No se pudieron cargar los cafés destacados.");
            return res.json();
        })
        .then(coffees => {
            if (!Array.isArray(coffees) || coffees.length === 0) {
                track.innerHTML = "<p>No hay productos destacados disponibles.</p>";
                return;
            }

            track.innerHTML = ''; // Limpiar lo que haya

                coffees.forEach(coffee => {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                item.style.minWidth = '300px'; // importante para el cálculo del desplazamiento

                item.innerHTML = `
                    <div class="relative w-full rounded-md overflow-hidden mb-4 flex justify-center items-center bg-white" style="height: 450px;">
    <img src="${coffee.imageUrl}" alt="${coffee.name}" class="object-contain max-h-full max-w-full" />
    
    <div class="absolute bottom-0 left-0 w-full p-4" style="
        background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 80%, transparent 100%);
        color: white;
        text-shadow: 2px 2px 6px rgba(0,0,0,0.9);
    ">
        <h3 class="text-lg font-semibold">${coffee.name}</h3>
        <p class="text-sm">${coffee.description || ''}</p>
        <p class="text-sm font-bold mt-1">$${parseFloat(coffee.price).toFixed(2)}</p>
    </div>
</div>

<div class="flex justify-start">
    <a href="details-coffee.html?id=${coffee.id}" class="btn-detalles inline-block cursor-pointer">Ver detalles</a>
</div>
                `;

                track.appendChild(item);
            });

            // Iniciar animación del carrusel después de renderizar
            const items = document.querySelectorAll('.carousel-item');
            let index = 0;
            const totalItems = items.length;

            function slideCarousel() {
                index++;
                if (index >= totalItems) {
                    index = 0;
                }
                const itemWidth = items[0].offsetWidth;
                track.style.transition = 'transform 0.5s ease';
                track.style.transform = `translateX(-${index * itemWidth}px)`;
            }

            setInterval(slideCarousel, 5000);
        })
        .catch(err => {
            console.error("Error al cargar los cafés destacados:", err);
            track.innerHTML = "<p>Error al cargar productos destacados.</p>";
        });
});

// ---------------------- TÍTULO ANIMADO HERO ----------------------
const headings = [
    "Un Café Primero",
    "Calidad y Sabor en Cada Taza",
    "Tu Tienda de Cafés en Línea",
    "Café Café Café Café!!"
];
let currentIndex = 0;
const dynamicHeading = document.getElementById('dynamic-heading');

function slideToNextHeading() {
    dynamicHeading.classList.add('slide-out-left');

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

dynamicHeading.textContent = headings[currentIndex];
setInterval(slideToNextHeading, 5000);


// ---------------------- CARGAR PRODUCTOS NORMALES ----------------------
document.addEventListener("DOMContentLoaded", () => {
    const coffeeContainer = document.getElementById("coffee-container");
    const cartCountElem = document.querySelector('.cart-count');

    fetch("http://localhost:8080/api/coffee")
        .then(res => {
            if (!res.ok) throw new Error("No se pudieron cargar los cafés.");
            return res.json();
        })
        .then(coffees => {
            coffees.forEach(coffee => {
                const card = document.createElement("div");
                card.className = "product-card bg-secundario rounded-lg shadow-md p-4 flex flex-col items-center max-w-sm";

                card.innerHTML = `
                    <img src="${coffee.imageUrl}" alt="${coffee.name}" class="w-full h-48 object-cover rounded-md mb-4">
                    <h3 class="text-title font-semibold text-xl mb-2">${coffee.name}</h3>
                    <p class="text-botones font-bold mb-4">$${parseFloat(coffee.price).toFixed(2)}</p>
                    <div class="flex space-x-4">
                        <a href="details-coffee.html?id=${coffee.id}" class="btn-detalles inline-block cursor-pointer">Ver detalles</a>
                        <button class="btn-agregar" data-id="${coffee.id}">Agregar al carrito</button>
                    </div>
                `;

                coffeeContainer.appendChild(card);
            });
        }).catch(err => {
            console.error("Error al cargar los cafés:", err);
        });

    coffeeContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-agregar')) {
            const productId = event.target.getAttribute('data-id');
            const token = localStorage.getItem('token');

            if (!token) {
                Swal.fire({
                    icon: 'warning',
                    buttonsStyling: false,
                    customClass: { confirmButton: 'btn' },
                    title: '¡Atención!',
                    text: 'Debes iniciar sesión para agregar productos al carrito.',
                    confirmButtonText: 'Iniciar sesión',
                    confirmButtonColor: '#7D5941',
                    showCloseButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login.html';
                    }
                });
                return;
            }

            fetch('/api/cart/' + encodeURIComponent(productId), {
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + token
                },
                credentials: 'include'
            })
                .then(res => {
                    if (!res.ok) throw new Error('Error al agregar al carrito');
                    return res.text();
                })
                .then(() => {
                    cartCountElem.textContent = parseInt(cartCountElem.textContent) + 1;
                    Swal.fire({
                        icon: 'success',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn',
                            cancelButton: 'swal-cancel-btn'
                        },
                        title: '¡Agregado!',
                        text: 'Producto agregado al carrito.',
                        confirmButtonColor: '#7D5941'
                    });
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        icon: 'error',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn',
                            cancelButton: 'swal-cancel-btn'
                        },
                        title: 'Error',
                        text: 'No se pudo agregar el producto al carrito.',
                        confirmButtonColor: '#7D5941'
                    });
                });
        }
    });
});
