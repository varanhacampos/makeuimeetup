export interface SheetProps {
    open: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    blocking?: boolean;
}

export type SheetSize = 'auto' | 'fullscreen';

export interface SheetContextValue {
    close: () => void;
}
