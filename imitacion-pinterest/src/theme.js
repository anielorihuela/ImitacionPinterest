
// 1. Esta función se ejecuta sola al importar el archivo
export const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
};

// 2. Esta función la usaremos en el botón del Header
export const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};

// La ejecutamos inmediatamente para evitar el "parpadeo blanco"
initTheme();