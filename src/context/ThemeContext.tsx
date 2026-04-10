import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("high_contrast") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("high_contrast", String(highContrast));
  }, [highContrast]);

  const toggleHighContrast = () => setHighContrast((p) => !p);

  return (
    <ThemeContext.Provider value={{ highContrast, toggleHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
