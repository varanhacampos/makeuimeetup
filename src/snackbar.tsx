'use client';
import * as React from 'react';
import * as styles from './snackbar.css';

interface Props {
    text: string;
}

const Snackbar = ({ text }: Props) => {
    return (
        <div className={styles.snackbar}>
            {text}
        </div>
    );
};

export default Snackbar;
