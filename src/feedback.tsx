'use client';
import * as React from 'react';
import * as styles from './feedback.css';

export interface FeedbackProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    visible: boolean;
}

const Feedback = ({ message, type = 'info', visible }: FeedbackProps) => {
    if (!visible) return null;

    return (
        <div className={styles.container} data-type={type}>
            {message}
        </div>
    );
};

export default Feedback;
