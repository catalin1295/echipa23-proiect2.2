import { useState, useEffect } from 'react';

/**
 * Hook pentru gestionarea modului light/dark.
 * Persista preferinta in localStorage.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Citeste preferinta salvata sau foloseste preferinta sistemului
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Aplica/elimina clasa "dark" pe <html>
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);
  return [isDark, toggle];
}
