'use client';
import React from 'react';
import { TextFieldBase } from './text-field-base';
import styles from './cvv-field.css';
import {
    isAmericanExpress,
    getCreditCardNumberLength,
} from './utils/credit-card';

interface Props {
    name: string;
    label?: string;
    value?: string;
    cardNumber?: string; // para decidir se é 3 ou 4 dígitos (Amex)
    error?: string;
    helperText?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export default function CVVField({
    name,
    label = 'CVV',
    value,
    cardNumber,
    error,
    helperText,
    onChange,
    disabled,
}: Props) {
    const maxLength = isAmericanExpress(cardNumber ?? '') ? 4 : 3;

    const format = (v: string) => v.replace(/[^\d]/g, '').slice(0, maxLength);

    const validated =
        value && value.length < maxLength
            ? `Digite ${maxLength} dígitos`
            : error;

    return (
        <TextFieldBase
            name={name}
            label={label}
            value={value}
            error={validated}
            helperText={helperText}
            disabled={disabled}
            onChange={(e) => {
                const formatted = format(e.currentTarget.value);
                onChange?.(formatted);
            }}
            endIcon={<span className={styles.cvvIcon}>🔒</span>}
        />
    );
}
