export const sanitizeDigits = (raw: string) =>
    raw.replace(/[^\d]/g, '');

export const sanitizeDecimal = (raw: string) =>
    raw.replace(/[^0-9.,]/g, '').replace(',', '.');

export const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const formatInteger = (raw: string) =>
    raw.replace(/[^\d]/g, '');

export const formatDecimal = (raw: string) => {
    const cleaned = raw.replace(/[^0-9.,]/g, '').replace(',', '.');
    const parts = cleaned.split('.');
    return parts[0] + (parts[1] ? '.' + parts[1].slice(0, 2) : '');
};
