const storageKey = 'theme';

export const script = `try {
  if (
    localStorage["${storageKey}"] === 'dark' ||
    (!("${storageKey}" in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.toggle('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
} catch (_) {}`.trim();
