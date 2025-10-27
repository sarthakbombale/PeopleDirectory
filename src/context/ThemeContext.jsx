import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Get theme from localStorage or default to false (light mode)
const getStoredTheme = () => {
  try {
    const storedTheme = localStorage.getItem('isDarkMode');
    return storedTheme ? JSON.parse(storedTheme) : false;
  } catch {
    return false;
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getStoredTheme());

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#1a1a1a' : '#fafafa',
      surface: isDarkMode ? '#2d2d2d' : '#ffffff',
      primary: '#6f42c1',
      text: isDarkMode ? '#ffffff' : '#000000',
      secondaryText: isDarkMode ? '#cccccc' : '#666666',
      border: isDarkMode ? '#404040' : '#eeeeee',
      cardShadow: isDarkMode ? '0 0 10px rgba(0,0,0,0.5)' : '0 0 10px rgba(0,0,0,0.1)',
      headerBg: isDarkMode ? '#2d2d2d' : '#ffffff',
      sidebarBg: isDarkMode ? '#2d2d2d' : '#f8f5ff',
      tableHeader: isDarkMode ? '#363636' : '#f2f0fa',
      tableBorder: isDarkMode ? '#404040' : '#cccccc',
      buttonBg: isDarkMode ? '#404040' : '#ffffff',
      buttonText: isDarkMode ? '#ffffff' : '#000000',
      buttonBorder: isDarkMode ? '#666666' : '#cccccc',
    },
    toggleTheme: () => setIsDarkMode(prev => !prev)
  };

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);