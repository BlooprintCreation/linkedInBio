// --- ACCORDÉON ---
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    
      document.querySelectorAll('.accordion-content').forEach(c => {
      if (c !== content) {
        c.style.maxHeight = null;
        c.previousElementSibling.classList.remove('active');
      }
    });

    header.classList.toggle('active');
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
  });
});

// --- DARK/LIGHT TOGGLE ---
const toggle = document.getElementById('theme-toggle');

// Initialisation
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  toggle.checked = true;
}

// toggle
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  localStorage.setItem('theme', toggle.checked ? 'dark' : 'light');
});


