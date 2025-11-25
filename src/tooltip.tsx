'use client';
import React from 'react';
import styles from './tooltip.css';

export interface TooltipProps {
    children: React.ReactNode;
    text: string;
    position?: 'top' | 'bottom';
    delay?: number; // ms
}

export default function Tooltip({
    children,
    text,
    position = 'top',
    delay = 80,
}: TooltipProps) {
    const [visible, setVisible] = React.useState(false);
    const timeoutRef = React.useRef<any>(null);

    const show = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const hide = () => {
        clearTimeout(timeoutRef.current);
        setVisible(false);
    };

    return (
        <div
            className={styles.tooltipWrapper}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}

            <div
                className={[
                    styles.tooltipBubble,
                    position === 'top' ? styles.top : styles.bottom,
                    visible ? styles.visible : '',
                ].join(' ')}
            >
                {text}

                <div
                    className={[
                        styles.arrow,
                        position === 'top'
                            ? styles.arrowTop
                            : styles.arrowBottom,
                    ].join(' ')}
                />
            </div>
        </div>
    );
}
