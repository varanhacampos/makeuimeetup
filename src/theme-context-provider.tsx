'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import styles from './theme-context-provider.css';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
    theme: ThemeMode;
    setTheme: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: ThemeMode;
}

export function ThemeProvider({
    children,
    defaultTheme = 'light',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);

    // Aplica o tema no HTML (para var() no CSS funcionar)
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const setTheme = (mode: ThemeMode) => setThemeState(mode);

    const toggleTheme = () =>
        setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            <div className={styles.themeContainer}>{children}</div>
        </ThemeContext.Provider>
    );
}

// Hook para uso
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used inside <ThemeProvider>');
    }
    return ctx;
}
