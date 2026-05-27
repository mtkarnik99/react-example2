// src/context/ThemeContext.jsx
import { createContext, useState, useContext, useMemo } from 'react';

// Step 1 — create the context
// null is the default value — only used if a component tries to
// consume context outside of a Provider
export const ThemeContext = createContext(null);

// custom hook — wraps useContext for cleaner imports in consumer components
// instead of importing both useContext and ThemeContext everywhere,
// components just import useTheme
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider component — wraps the app and makes theme available everywhere
// any component inside this Provider can call useTheme() to access the value
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light');
  }

  // useMemo prevents a new object reference on every render
  // without this, every context consumer re-renders whenever
  // the Provider's parent re-renders — even if theme didn't change
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}