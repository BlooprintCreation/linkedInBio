 document.addEventListener('DOMContentLoaded', () => {
  /* ===================== DARK MODE TOGGLE ===================== */
  const toggleInput = document.querySelector('.switch input');
  toggleInput.addEventListener('change', () => {
    document.body.classList.toggle('dark', toggleInput.checked);
  });

  /* ===================== ACCORDIONS ===================== */
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');

      // Fermer tous les autres accordéons sauf celui cliqué
      headers.forEach(h => {
        const c = h.nextElementSibling;
        if (h !== header) {
          h.classList.remove('active');
          if (c && c.classList.contains('open')) {
            c.style.height = c.scrollHeight + 'px';
            c.style.overflow = 'hidden';
            requestAnimationFrame(() => {
              c.style.transition = 'height 0.3s ease';
              c.style.height = '0';
            });
            c.classList.remove('open');
            h.setAttribute('aria-expanded', 'false');
          }
        }
      });

      if (content) {
        content.style.overflow = 'hidden';
        if (isOpen) {
          // Si déjà ouvert, refermer
          header.classList.remove('active');
          content.style.height = content.scrollHeight + 'px';
          requestAnimationFrame(() => {
            content.style.transition = 'height 0.3s ease';
            content.style.height = '0';
          });
          content.classList.remove('open');
          header.setAttribute('aria-expanded', 'false');
        } else {
          // Ouvrir l'accordéon
          header.classList.add('active');
          content.classList.add('open');
          content.style.transition = 'none';
          content.style.height = '0';
          requestAnimationFrame(() => {
            content.style.transition = 'height 0.3s ease';
            content.style.height = content.scrollHeight + 'px';
          });

          // Ajuster à auto après animation
          const handler = () => {
            if (content.classList.contains('open')) {
              content.style.transition = 'none';
              content.style.height = 'auto';
              content.style.overflow = 'visible';
            }
            content.removeEventListener('transitionend', handler);
          };
          content.addEventListener('transitionend', handler);
          header.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });
});