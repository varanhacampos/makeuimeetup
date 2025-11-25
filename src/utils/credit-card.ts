export type CardOptions = {
    visa?: boolean;
    masterCard?: boolean;
    americanExpress?: boolean;
};

export const isVisa = (value?: string) => {
    if (!value) return false;
    return /^4[0-9]{6,}$/.test(value.replace(/\s/g, ''));
};

export const isMasterCard = (value?: string) => {
    if (!value) return false;
    const v = value.replace(/\s/g, '');
    return /^5[1-5][0-9]{5,}$/.test(v) || /^2(2[2-9]|[3-6][0-9]|7[01])[0-9]{4,}$/.test(v);
};

export const isAmericanExpress = (value?: string) => {
    if (!value) return false;
    return /^3[47][0-9]{5,}$/.test(value.replace(/\s/g, ''));
};

export const getCreditCardNumberLength = (value?: string) => {
    if (isAmericanExpress(value)) return 15;
    return 16;
};

export const isValidCreditCardNumber = (val?: string) => {
    if (!val) return false;
    const num = val.replace(/\s/g, '');
    let sum = 0;
    let shouldDouble = false;

    for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};
