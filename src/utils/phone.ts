export const formatPhone = (raw: string): string => {
    const digits = raw.replace(/[^\d]/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export const isValidPhone = (value: string) => {
    const digits = value.replace(/[^\d]/g, '');
    return digits.length >= 10;
};
