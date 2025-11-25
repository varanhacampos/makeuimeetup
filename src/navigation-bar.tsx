'use client';
import React from 'react';
import styles from './navigation-bar.css';

export interface NavBarAction {
    label?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
}

export interface NavigationBarProps {
    title?: string;
    backButton?: boolean | NavBarAction;
    rightActions?: NavBarAction[];
}

export default function NavigationBar({
    title,
    backButton,
    rightActions = [],
}: NavigationBarProps) {
    const renderBackButton = () => {
        if (!backButton) return null;

        const isCustom = typeof backButton === 'object';

        const onPress = isCustom && backButton.onPress ? backButton.onPress : () => window.history.back();
        const content =
            isCustom && (backButton.icon || backButton.label) ? (
                <>
                    {backButton.icon}
                    {backButton.label}
                </>
            ) : (
                <>
                    <span className={styles.backIcon}>←</span>
                    Voltar
                </>
            );

        return (
            <div className={styles.backButton} onClick={onPress}>
                {content}
            </div>
        );
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>{renderBackButton()}</div>

            <div className={styles.center}>{title}</div>

            <div className={styles.right}>
                {rightActions.map((action, index) => (
                    <div
                        key={index}
                        className={styles.actionButton}
                        onClick={action.onPress}
                    >
                        {action.icon || action.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
