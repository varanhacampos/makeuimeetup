'use client';
import React from 'react';
import { TextFieldBase } from './text-field-base';
import {
    isVisa,
    isMasterCard,
    isAmericanExpress,
    isValidCreditCardNumber,
    getCreditCardNumberLength,
} from './utils/credit-card';
import styles from './credit-card-number-field.css';

// -----------------------------------------------------------
// ÍCONES SIMPLES (substitua pelos seus depois)
// -----------------------------------------------------------
const VisaIcon = () => <span style={{ fontSize: 18 }}>💳</span>;
const MastercardIcon = () => <span style={{ fontSize: 18 }}>🟠🟡</span>;
const AmexIcon = () => <span style={{ fontSize: 18 }}>🔷</span>;
const DefaultIcon = () => <span style={{ fontSize: 18 }}>💳</span>;

// -----------------------------------------------------------
// FORMATADOR
// -----------------------------------------------------------
const formatNumber = (value: string) => {
    const digits = value.replace(/[^\d]/g, '');
    return digits.match(/.{1,4}/g)?.join(' ') ?? digits;
};

// -----------------------------------------------------------
// INPUT CUSTOMIZADO
// -----------------------------------------------------------
const CreditCardInput = ({
    value,
    onChange,
    inputRef,
    ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
    inputRef?: React.Ref<HTMLInputElement>;
}) => {
    const ref = React.useRef<HTMLInputElement | null>(null);

    const setValue = (raw: string) => {
        const formatted = formatNumber(raw);
        if (ref.current) {
            const event = {
                target: { ...ref.current, value: formatted },
                currentTarget: { ...ref.current, value: formatted },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange?.(event);
        }
    };

    return (
        <input
            {...rest}
            ref={(el) => {
                ref.current = el;
                if (typeof inputRef === 'function') inputRef(el);
            }}
            type="text"
            inputMode="numeric"
            value={value}
            maxLength={23}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

// -----------------------------------------------------------
// ADORNMENT COM ANIMAÇÃO DE FLIP
// -----------------------------------------------------------
const CreditCardAdornment = ({ value }: { value?: string }) => {
    const cleaned = value?.replace(/\s/g, '') ?? '';

    const target = isVisa(cleaned)
        ? <VisaIcon />
        : isMasterCard(cleaned)
        ? <MastercardIcon />
        : isAmericanExpress(cleaned)
        ? <AmexIcon />
        : <DefaultIcon />;

    const showBack =
        isVisa(cleaned) || isMasterCard(cleaned) || isAmericanExpress(cleaned);

    return (
        <div className={styles.flipContainer}>
            <div
                className={`${styles.flipCard} ${
                    showBack ? styles.showBack : ''
                }`}
            >
                <div className={styles.front}>
                    <DefaultIcon />
                </div>

                <div className={styles.back}>{target}</div>
            </div>
        </div>
    );
};

// -----------------------------------------------------------
// COMPONENTE PRINCIPAL
// -----------------------------------------------------------
interface Props {
    name: string;
    label: string;
    error?: string;
    helperText?: string;
    onChange?: (value: string) => void;
    value?: string;
}

export default function CreditCardNumberField({
    name,
    label,
    error,
    helperText,
    value,
    onChange,
}: Props) {
    const raw = value?.replace(/\s/g, '') ?? '';
    const max = getCreditCardNumberLength(raw);

    const validated =
        raw.length >= max && !isValidCreditCardNumber(raw)
            ? 'Número de cartão inválido'
            : error;

    return (
        <TextFieldBase
            name={name}
            label={label}
            error={validated}
            helperText={helperText}
            value={value}
            onChange={(e) => {
                onChange?.(e.currentTarget.value);
            }}
            inputComponent={CreditCardInput}
            endIcon={<CreditCardAdornment value={value} />}
        />
    );
}
