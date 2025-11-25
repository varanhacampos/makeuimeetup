'use client';
import React from 'react';
import styles from './menu.css';

export interface MenuItem {
    label: string;
    onPress?: () => void;
    separator?: boolean;
}

export interface MenuProps {
    trigger: React.ReactNode;
    items: MenuItem[];
}

export default function Menu({ trigger, items }: MenuProps) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    // Fecha o menu ao clicar fora
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.menuContainer} ref={ref}>
            <div
                className={styles.trigger}
                onClick={() => setOpen((v) => !v)}
            >
                {trigger}
            </div>

            <div
                className={`${styles.menuPanel} ${open ? styles.open : ''}`}
            >
                {items.map((item, idx) =>
                    item.separator ? (
                        <div key={idx} className={styles.separator} />
                    ) : (
                        <div
                            key={idx}
                            className={styles.item}
                            onClick={() => {
                                item.onPress?.();
                                setOpen(false);
                            }}
                        >
                            {item.label}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
