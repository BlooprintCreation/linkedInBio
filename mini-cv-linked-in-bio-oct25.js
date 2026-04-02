// --- DARK/LIGHT TOGGLE ---
const toggle = document.getElementById('theme-toggle');

function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    if (toggle) toggle.checked = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialIsDark = savedTheme === 'dark' ? true : savedTheme === 'light' ? false : prefersDark;
    applyTheme(initialIsDark);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    if (toggle) {
        toggle.addEventListener('change', () => applyTheme(toggle.checked));
    }

    // --- ACCORDÉON ---
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.classList.contains('active');

            // Fermer tous les autres
            headers.forEach(h => {
                const c = h.nextElementSibling;
                h.classList.remove('active');
                if (c) {
                    c.style.height = c.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        c.style.transition = 'height 0.4s ease';
                        c.style.height = '0';
                    });
                    c.classList.remove('open');
                }
            });

            // Ouvrir celui cliqué
            if (!isOpen && content) {
                header.classList.add('active');
                content.classList.add('open');
                content.style.transition = 'none';
                content.style.height = '0';
                requestAnimationFrame(() => {
                    content.style.transition = 'height 0.4s ease';
                    content.style.height = content.scrollHeight + 'px';
                });

                // Après transition, passer à auto pour no saccades au resize
                content.addEventListener('transitionend', function handler() {
                    if (content.classList.contains('open')) {
                        content.style.transition = 'none';
                        content.style.height = 'auto';
                    }
                    content.removeEventListener('transitionend', handler);
                });
            }
        });
    });
});