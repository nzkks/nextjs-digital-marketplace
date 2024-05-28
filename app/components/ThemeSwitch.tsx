'use client';

import { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';

import ThemeContext from '../context/themeContext';

const ThemeSwitch = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <div>
      {darkTheme ? (
        <Sun
          className="h-4 w-4 cursor-pointer"
          onClick={() => {
            setDarkTheme(false);
            localStorage.removeItem('site-theme');
          }}
        />
      ) : (
        <Moon
          className="h-4 w-4 cursor-pointer"
          onClick={() => {
            setDarkTheme(true);
            localStorage.setItem('site-theme', 'true');
          }}
        />
      )}
    </div>
  );
};

export default ThemeSwitch;
