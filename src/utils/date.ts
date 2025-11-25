export const isValidDate = (value: string): boolean => {
    const [dd, mm, yyyy] = value.split('/').map(Number);
    if (!dd || !mm || !yyyy) return false;
    if (mm < 1 || mm > 12) return false;
    const lastDay = new Date(yyyy, mm, 0).getDate();
    return dd >= 1 && dd <= lastDay;
};

export const formatDate = (raw: string): string => {
    const digits = raw.replace(/[^\d]/g, '').slice(0, 8);
    const parts = [];

    if (digits.length >= 2) parts.push(digits.slice(0, 2));
    if (digits.length >= 4) parts.push(digits.slice(2, 4));
    if (digits.length > 4) parts.push(digits.slice(4));

    return parts.join('/');
};

export const isValidExpiration = (value: string) => {
    const [mm, yy] = value.split('/').map(Number);
    if (!mm || !yy) return false;
    if (mm < 1 || mm > 12) return false;

    const currentYear = Number(String(new Date().getFullYear()).slice(-2));
    const currentMonth = new Date().getMonth() + 1;

    if (yy < currentYear) return false;
    if (yy === currentYear && mm < currentMonth) return false;

    return true;
};

export const formatExpiration = (raw: string): string => {
    const digits = raw.replace(/[^\d]/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
};
