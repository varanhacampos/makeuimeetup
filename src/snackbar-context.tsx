'use client';
import * as React from 'react';
import Snackbar from './snackbar';

interface SnackbarMessage {
    id: number;
    text: string;
}

interface SnackbarContextValue {
    show(message: string): void;
}

const SnackbarContext = React.createContext<SnackbarContextValue | undefined>(
    undefined
);

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = React.useState<SnackbarMessage[]>([]);

    const show = (text: string) => {
        const id = Date.now();
        setMessages(prev => [...prev, { id, text }]);
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== id));
        }, 3000);
    };

    return (
        <SnackbarContext.Provider value={{ show }}>
            {children}
            {messages.map(msg => (
                <Snackbar key={msg.id} text={msg.text} />
            ))}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const ctx = React.useContext(SnackbarContext);
    if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider');
    return ctx;
};
