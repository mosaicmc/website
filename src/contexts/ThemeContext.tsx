import React, { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './theme-context-data';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const preferred = localStorage.getItem('preferredTheme') as Theme | null;
      const legacy = localStorage.getItem('theme') as Theme | null;

      const initial = (preferred || legacy) as Theme | null;
      if (initial && (initial === 'light' || initial === 'dark')) {
        const root = document.documentElement;
        const body = document.body;
        if (initial === 'dark') {
          root.classList.add('dark');
          body.classList.remove('theme-light');
        } else {
          root.classList.remove('dark');
          body.classList.add('theme-light');
        }
        // Migrate legacy key to preferredTheme for consistency
        try { localStorage.setItem('preferredTheme', initial); } catch { /* noop */ }
        return initial;
      }

      // Default to light theme and apply immediately (override system/browser prefs)
      const root = document.documentElement;
      const body = document.body;
      root.classList.remove('dark');
      body.classList.add('theme-light');
      try { localStorage.setItem('preferredTheme', 'light'); } catch { /* noop */ }
    }
    return 'light';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.remove('theme-light');
    } else {
      root.classList.remove('dark');
      body.classList.add('theme-light');
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
