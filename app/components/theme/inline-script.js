if (
  localStorage['theme'] === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.toggle('dark');
  document.documentElement.style.colorScheme = 'dark';
}
