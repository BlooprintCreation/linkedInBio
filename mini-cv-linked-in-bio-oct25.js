// --- DARK/LIGHT TOGGLE   ---
const toggle = document.getElementById('theme-toggle');

/**
 * Applique le thème sombre/clair et synchronise tous les états.
 * @param {boolean} isDark 
 */
function applyTheme(isDark) {
    // 1. Applique la classe 'dark' au corps
    document.body.classList.toggle('dark', isDark);
    
    // 2. Met à jour l'état de la checkbox
    toggle.checked = isDark;

    // 3. Sauvegarde la préférence
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // 4. Mettre à jour l'icône du soleil/lune 
}

// --- INITIALISATION Au chargement de la page ---
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialIsDark;

    if (savedTheme === 'dark') {
        // L'utilisateur a explicitement choisi le mode sombre
        initialIsDark = true;
    } else if (savedTheme === 'light') {
        // L'utilisateur a explicitement choisi le mode clair
        initialIsDark = false;
    } else {
        // Pas de préférence enregistrée, utilise la préférence système
        initialIsDark = prefersDark;
    }

    applyTheme(initialIsDark);
}

// Initialise le thème dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', initializeTheme);

// --- ÉVÉNEMENT DE CHANGEMENT ---
toggle.addEventListener('change', () => {
    // Récupère le nouvel état de la checkbox et l'applique
    applyTheme(toggle.checked);
});

// --- ACCORDÉON  ---
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isCurrentlyOpen = header.classList.contains('active');

        // 1. Fermer tous les autres 
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.style.maxHeight = null;
            h.nextElementSibling.classList.remove('open'); 
        });

        // 2. Ouvrir / fermer celui cliqué
        if (!isCurrentlyOpen) {
            header.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add('open'); 
        }
    });
});