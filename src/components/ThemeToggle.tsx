'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false); // prevent hydration issues

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Toggle the dark class on the html element
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  if (!mounted) return null; // avoid server/client mismatch

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border bg-gray-200 dark:bg-gray-700 dark:text-white transition"
    >
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
}
