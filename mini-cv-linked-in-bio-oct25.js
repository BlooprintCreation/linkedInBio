// --- DARK/LIGHT TOGGLE ---
const toggle = document.getElementById('theme-toggle');

/**
 * Applique le thème sombre/clair et synchronise tous les états.
 * @param {boolean} isDark 
 */
function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);

    if (toggle) {
        toggle.checked = isDark;
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// --- INITIALISATION ---
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialIsDark;

    if (savedTheme === 'dark') {
        initialIsDark = true;
    } else if (savedTheme === 'light') {
        initialIsDark = false;
    } else {
        initialIsDark = prefersDark;
    }

    applyTheme(initialIsDark);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // --- ÉVÉNEMENT TOGGLE (sécurisé) ---
    if (toggle) {
        toggle.addEventListener('change', () => {
            applyTheme(toggle.checked);
        });
    }

    // --- ACCORDÉON ---
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCurrentlyOpen = header.classList.contains('active');

            // Fermer tous les autres
            headers.forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) {
                    h.nextElementSibling.style.maxHeight = null;
                    h.nextElementSibling.classList.remove('open');
                }
            });

            // Ouvrir celui cliqué
            if (!isCurrentlyOpen && content) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('open');
            }
        });
    });
});