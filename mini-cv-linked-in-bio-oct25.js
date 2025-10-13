document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
     const content = header.nextElementSibling;
     
     header.classList.toggle('active');
    
    if (content.style.maxHeight) {
      content.style.maxHeight = null; u
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; 
    }
  });
});

// --- Toggle dark/light ---
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  localStorage.setItem('theme', toggle.checked ? 'dark' : 'light');
});

 
