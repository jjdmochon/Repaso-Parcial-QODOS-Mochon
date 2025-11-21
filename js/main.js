document.addEventListener('DOMContentLoaded', () => {
    // Lógica para los acordeones
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('svg');
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // Lógica para los botones de toggle simple
    window.toggleElement = function(id) {
            const content = document.getElementById(id);
            content.classList.toggle('hidden');
    }

    // Lógica para las pestañas
    window.changeTab = function(event, tabId, wrapperId) {
        event.stopPropagation(); // ¡Esta es la línea clave! Evita que el clic se propague a la tarjeta.
        const wrapper = document.getElementById(wrapperId);
        const buttons = wrapper.querySelectorAll('.tab-button');
        const contents = wrapper.querySelectorAll('.tab-content');

        buttons.forEach(button => button.classList.remove('tab-active'));
        event.target.classList.add('tab-active');

        contents.forEach(content => {
            if (content.id === tabId) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }

    // Lógica para los gráficos con Chart.js
    const ctxCarbocation = document.getElementById('carbocationChart').getContext('2d');
    new Chart(ctxCarbocation, {
        type: 'bar',
        data: {
            labels: ['Bencílico', 'Terciario (3º)', 'Secundario (2º)', 'Primario (1º)'],
            datasets: [{
                label: 'Estabilidad Relativa (Menor Energía)',
                data: [100, 85, 60, 10], // Mantengo datos, cambio colores
                backgroundColor: ['#00808099', '#3EB48999', '#FF7F5099', '#A6442699'], // Teal, Mint, Coral, Darker Coral
                borderColor: ['#008080', '#3EB489', '#FF7F50', '#A64426'],
                borderWidth: 1
            }]
        },
        options: { scales: { y: { beginAtZero: true, display: false } }, plugins: { legend: { display: false } } }
    });

    const ctxPka = document.getElementById('pkaChart').getContext('2d');
    new Chart(ctxPka, {
        type: 'bar',
        data: {
            labels: ['Tiofenol (~6.5)', 'Fenol (~10)', 'Tiol (~10.5)', 'Agua (15.7)', 'Alcohol (~16)'],
            datasets: [{
                label: 'Acidez (Menor pKa = Más Ácido)',
                data: [6.5, 10, 10.5, 15.7, 16],
                    backgroundColor: ['#00808099', '#3EB48999', '#00666699', '#36454F99', '#A6442699'],
                borderColor: ['#008080', '#3EB489', '#006666', '#36454F', '#A64426'],
                borderWidth: 1
            }]
        },
            options: { indexAxis: 'y', scales: { x: { beginAtZero: true, title: { display: true, text: 'pKa' } } }, plugins: { legend: { display: false } } }
    });

    const ctxAmine = document.getElementById('amineBasicityChart').getContext('2d');
    new Chart(ctxAmine, {
        type: 'bar',
        data: {
            labels: ['Anilina (Aromática)', 'Amoníaco (Ref.)', 'Etilamina (Alifática)'],
            datasets: [{
                label: 'pKa del Ácido Conjugado (Mayor pKa = Base más Fuerte)',
                data: [4.6, 9.25, 10.8],
                backgroundColor: ['#FF7F5099', '#36454F99', '#3EB48999'], // Coral, Charcoal, Mint
                borderColor: ['#FF7F50', '#36454F', '#3EB489'],
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true, title: { display: true, text: 'pKa (Ácido Conjugado)'} } },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ' pKa(Ác. Conj.): ' + context.raw;
                        }
                    }
                }
            }
        }
    });

});