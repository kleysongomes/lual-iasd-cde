document.addEventListener('DOMContentLoaded', () => {
    const catalogo = document.querySelector('.catalogo');

    // Carrega músicas do JSON
    fetch('musicas.json')
        .then(response => response.json())
        .then(musicas => {
            musicas.forEach((musicaObj) => {
                const button = document.createElement('button');
                button.className = 'accordion-button';
                button.textContent = musicaObj.musica;

                const icon = document.createElement('span');
                icon.className = 'icon';
                icon.textContent = '+';
                button.appendChild(icon);

                const panel = document.createElement('div');
                panel.className = 'panel';

                const pre = document.createElement('pre');
                pre.className = 'letra';
                pre.textContent = musicaObj.letra;
                panel.appendChild(pre);

                catalogo.appendChild(button);
                catalogo.appendChild(panel);
            });

            // Depois de adicionar, ativa o comportamento dos botões
            setupAccordion();
        });

    function setupAccordion() {
    const accordions = document.querySelectorAll('.accordion-button');

    accordions.forEach(clickedAccordion => {
        clickedAccordion.addEventListener('click', function () {
            const panel = this.nextElementSibling;
            const icon = this.querySelector('.icon');
            const isAlreadyActive = this.classList.contains('active');

            // Fecha todos os outros
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== this) {
                    otherAccordion.classList.remove('active');
                    otherAccordion.nextElementSibling.style.display = 'none';
                    otherAccordion.nextElementSibling.classList.remove('open');
                    otherAccordion.querySelector('.icon').style.transform = 'rotate(0deg)';
                }
            });

            if (isAlreadyActive) {
                this.classList.remove('active');
                panel.style.display = 'none';
                panel.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
            } else {
                this.classList.add('active');
                panel.style.display = 'block';
                panel.classList.add('open');
                icon.style.transform = 'rotate(45deg)';

                // Rola para o botão após garantir que o conteúdo foi exibido
                setTimeout(() => {
                    const yOffset = -10;
                    const y = this.getBoundingClientRect().top + window.scrollY + yOffset;

                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });
}

});
