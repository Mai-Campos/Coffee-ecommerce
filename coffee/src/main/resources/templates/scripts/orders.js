document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.getElementById('orders-table-body');

    // Mock orders data - replace with real data source as needed
    let orders = JSON.parse(localStorage.getItem('orders')) || [
        {
            id: 1,
            cliente: 'Juan Perez',
            productos: 'Café Americano, Latte',
            precioTotal: '$10.00'
        },
        {
            id: 2,
            cliente: 'Maria Lopez',
            productos: 'Mocha, Expresso',
            precioTotal: '$15.00'
        }
    ];

    function saveOrders() {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    function renderOrders() {
        ordersTableBody.innerHTML = '';
        orders.forEach(order => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.cliente}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href="orders-admin.html" class="text-blue-600 hover:underline">${order.productos}</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.precioTotal}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="complete-btn btn" data-id="${order.id}">
                        Completado
                    </button>
                </td>
            `;

            ordersTableBody.appendChild(tr);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                if (confirm('¿Desea marcar este pedido como completado?')) {
                    markOrderCompleted(id);
                }
            });
        });
    }

    function markOrderCompleted(id) {
        orders = orders.filter(order => order.id !== id);
        saveOrders();
        renderOrders();
    }

    renderOrders();
});
