import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeProviderState {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: undefined,
  setTheme: () => {},
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
