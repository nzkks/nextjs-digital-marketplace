'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <div className="min-h-screen">
        <div className="text-[#1e1e1e] dark:bg-black dark:text-white">
          {children}
        </div>
      </div>
    </NextThemesProvider>
  );
};

export default ThemeProvider;
