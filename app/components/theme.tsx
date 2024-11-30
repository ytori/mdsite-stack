import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

const storageKey = 'theme';

type Theme = 'dark' | 'light';

interface ThemeProviderState {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: undefined,
  setTheme: () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

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

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | undefined>();

  useEffect(() => {
    if (theme == null) {
      const initialTheme = document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
      setTheme(initialTheme);
      return;
    }

    withFlashingDisabled(() => {
      const element = document.documentElement;
      element.classList.remove('light', 'dark');
      element.classList.add(theme);
      element.style.colorScheme = theme;
    });
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context == null)
    throw new Error(
      '"useTheme" must be called within a "ThemeProvider" component',
    );

  return context;
}

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-transparent"
      onClick={() => {
        if (theme) {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }
      }}
    >
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

const script = `try {
  if (
    localStorage["${storageKey}"] === 'dark' ||
    (!("${storageKey}" in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    localStorage.setItem("${storageKey}", 'dark');
    document.documentElement.classList.toggle('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
} catch (_) {}`.trim();

export { type Theme, ThemeProvider, useTheme, ThemeToggleButton, script };
