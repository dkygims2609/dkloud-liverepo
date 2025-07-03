
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-button ${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={`icon-flip ${theme === 'dark' ? 'flipping' : ''}`}>
        {theme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
