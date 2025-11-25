'use client';
import * as React from 'react';
import { Portal } from './portal';
import { combineRefs } from './utils/common';
import * as styles from './dialog.css';

export interface DialogProps {
    open: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
    ({ open, onClose, children }, ref) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const mergedRef = combineRefs(ref, localRef);

        const handleBackdropClick = (e: React.MouseEvent) => {
            if (e.target === localRef.current) {
                onClose?.();
            }
        };

        if (!open) return null;

        return (
            <Portal>
                <div
                    ref={mergedRef}
                    className={styles.backdrop}
                    onClick={handleBackdropClick}
                >
                    <div className={styles.dialog}>{children}</div>
                </div>
            </Portal>
        );
    }
);

Dialog.displayName = 'Dialog';
export default Dialog;
