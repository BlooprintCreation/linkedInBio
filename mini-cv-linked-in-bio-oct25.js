// --- ACCORDÉON ---
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isCurrentlyOpen = header.classList.contains('active');

    // 1. Fermer tous les autres (et retirer la classe 'active')
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.classList.remove('active');
      h.nextElementSibling.style.maxHeight = null;
      h.nextElementSibling.classList.remove('open'); // Retrait de la classe 'open'
    });

    // 2. Ouvrir / fermer celui cliqué
    if (!isCurrentlyOpen) {
      header.classList.add('active');
      // Utiliser scrollHeight pour la transition CSS fluide
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add('open'); // Ajout de la classe 'open' pour le padding
    }
    // Si déjà ouvert, les boucles précédentes l'auront fermé.
  });
});


// --- DARK/LIGHT TOGGLE  ---
const toggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


// 1. Appliquer le thème sauvegardé OU le thème du système
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark');
  toggle.checked = true;
} else if (savedTheme === 'light') {
  document.body.classList.remove('dark');
  toggle.checked = false;
}


// 2. Événement de changement
toggle.addEventListener('change', () => {
  // CORRECTION CLÉ: La classe 'dark' est ajoutée ou retirée
  // en fonction de l'état du checkbox (checked = true/false)
  const isDark = toggle.checked;
  document.body.classList.toggle('dark', isDark);
  
  // Sauvegarder la préférence de l'utilisateur
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});