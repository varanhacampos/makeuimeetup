'use client';
import React from 'react';
import { TextFieldBase } from './text-field-base';
import { isValidEmail } from './utils/text';
import styles from './email-field.css';

interface Props {
    name: string;
    label?: string;
    value?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export default function EmailField({
    name,
    label = 'E-mail',
    value,
    error,
    helperText,
    disabled,
    onChange,
}: Props) {
    const validated =
        value && !isValidEmail(value)
            ? 'Digite um e-mail válido'
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
                onChange?.(e.currentTarget.value);
            }}
            endIcon={<span className={styles.emailIcon}>📧</span>}
        />
    );
}
