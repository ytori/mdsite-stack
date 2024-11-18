import { ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeProviderContext } from './context';

function withFlashingDisabled(fn: () => void) {
  const disableTransition = () => {
    const css = document.createElement('style');
    css.appendChild(
      document.createTextNode(
        `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`,
      ),
    );
    document.head.appendChild(css);
    return css;
  };

  const enableTransition = (css: HTMLStyleElement) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
  };

  const css = disableTransition();
  try {
    fn();
  } finally {
    enableTransition(css);
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | undefined>();

  useEffect(() => {
    if (theme == null) {
      const initialTheme = window.document.documentElement.classList.contains(
        'dark',
      )
        ? 'dark'
        : 'light';
      setTheme(initialTheme);
      return;
    }

    withFlashingDisabled(() => {
      const element = window.document.documentElement;
      element.classList.remove('light', 'dark');
      element.classList.add(theme);
      element.style.colorScheme = theme;
    });
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem('theme', theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
