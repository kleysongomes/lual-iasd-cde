document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-button');

    // Adiciona o ícone de '+' dinamicamente a cada botão
    accordions.forEach(accordion => {
        if (!accordion.querySelector('.icon')) { // Evita adicionar ícones duplicados
            const icon = document.createElement('span');
            icon.className = 'icon';
            icon.textContent = '+';
            accordion.appendChild(icon);
        }
    });

    accordions.forEach(clickedAccordion => {
        clickedAccordion.addEventListener('click', function() { // Usar 'function' para ter acesso ao 'this'
            const panel = this.nextElementSibling;
            const icon = this.querySelector('.icon');
            const isAlreadyActive = this.classList.contains('active');

            // 1. Fecha todos os painéis que não são o clicado
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== this) {
                    otherAccordion.classList.remove('active');
                    otherAccordion.nextElementSibling.style.maxHeight = null;
                    otherAccordion.nextElementSibling.classList.remove('open');
                    otherAccordion.querySelector('.icon').style.transform = 'rotate(0deg)';
                }
            });

            // 2. Abre ou fecha o painel que foi clicado
            if (isAlreadyActive) {
                // Se já estava ativo, fecha
                this.classList.remove('active');
                panel.style.maxHeight = null;
                panel.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Se estava fechado, abre
                this.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add('open');
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });
});