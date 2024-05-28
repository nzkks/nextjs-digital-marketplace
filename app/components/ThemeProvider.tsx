'use client';

import { ReactNode, useEffect, useState } from 'react';
import ThemeContext from '../context/themeContext';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeFromLocalStorage: boolean =
    typeof localStorage !== 'undefined' && localStorage.getItem('site-theme')
      ? JSON.parse(localStorage.getItem('site-theme')!)
      : false;

  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromLocalStorage);
  const [renderComponent, setRenderComponent] = useState<boolean>(false);

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? 'dark' : ''} min-h-screen`}>
        <div className="text-[#1e1e1e] dark:bg-black dark:text-white">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
