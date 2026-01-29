import React, { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './theme-context-data';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const preferred = localStorage.getItem('preferredTheme') as Theme | null;
    const legacy = localStorage.getItem('theme') as Theme | null;
    const initial = (preferred || legacy) as Theme | null;
    if (initial && (initial === 'light' || initial === 'dark')) {
      setTheme(initial);
      try { localStorage.setItem('preferredTheme', initial); } catch { /* noop */ }
    } else {
      try { localStorage.setItem('preferredTheme', 'dark'); } catch { /* noop */ }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('preferredTheme', theme); } catch { /* noop */ }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
