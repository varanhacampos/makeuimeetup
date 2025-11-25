'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import styles from './overscroll-color-context.css';

interface OverscrollContextValue {
    color: string;
    setColor: (color: string) => void;
}

const OverscrollContext = createContext<OverscrollContextValue | undefined>(undefined);

export function OverscrollColorProvider({
    children,
    defaultColor = 'rgba(127, 29, 209, 0.2)', // Vivo Purple fade
}: {
    children: React.ReactNode;
    defaultColor?: string;
}) {
    const [color, setColor] = useState(defaultColor);

    useEffect(() => {
        document.documentElement.style.setProperty('--overscroll-color', color);
    }, [color]);

    return (
        <OverscrollContext.Provider value={{ color, setColor }}>
            <div className={styles.overscrollWrapper}>{children}</div>
        </OverscrollContext.Provider>
    );
}

export function useOverscrollColor() {
    const ctx = useContext(OverscrollContext);
    if (!ctx) {
        throw new Error(
            'useOverscrollColor must be used inside <OverscrollColorProvider>'
        );
    }
    return ctx;
}
