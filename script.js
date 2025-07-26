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

                // Fecha todas as outras
                accordions.forEach(otherAccordion => {
                    if (otherAccordion !== this) {
                        otherAccordion.classList.remove('active');
                        otherAccordion.nextElementSibling.style.maxHeight = null;
                        otherAccordion.nextElementSibling.classList.remove('open');
                        otherAccordion.querySelector('.icon').style.transform = 'rotate(0deg)';
                    }
                });

                if (isAlreadyActive) {
                    this.classList.remove('active');
                    panel.style.maxHeight = null;
                    panel.classList.remove('open');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    this.classList.add('active');
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    panel.classList.add('open');
                    icon.style.transform = 'rotate(45deg)';

                    // Aguarda o painel expandir antes de rolar
                    setTimeout(() => {
                        const yOffset = 0; // espaço do topo
                        const y = this.getBoundingClientRect().top + window.scrollY + yOffset;

                        window.scrollTo({
                            top: y,
                            behavior: 'smooth'
                        });
                    }, 350); // tempo suficiente para expandir
                }
            });
        });
    }
});
