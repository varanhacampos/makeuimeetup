'use client';
import React from 'react';
import styles from './accordion.css';

export interface AccordionProps {
    label: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function Accordion({
    label,
    children,
    defaultOpen = false,
}: AccordionProps) {
    const [open, setOpen] = React.useState(defaultOpen);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const maxHeight = open
        ? contentRef.current?.scrollHeight ?? 0
        : 0;

    return (
        <div className={styles.accordion}>
            <button
                className={styles.header}
                type="button"
                onClick={() => setOpen((o) => !o)}
            >
                <span className={styles.label}>{label}</span>

                <span
                    className={
                        open
                            ? `${styles.icon} ${styles.iconOpen}`
                            : styles.icon
                    }
                >
                    ▶
                </span>
            </button>

            <div
                className={styles.contentWrapper}
                style={{ maxHeight }}
            >
                <div ref={contentRef} className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
