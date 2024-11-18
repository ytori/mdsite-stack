import { useContext } from 'react';

import { ThemeProviderContext } from './context';

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context == null)
    throw new Error(
      '"useTheme" must be called within a "ThemeProvider" component',
    );

  return context;
}
