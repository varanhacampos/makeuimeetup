'use client';

import React, {createContext, useContext, useState, useCallback, useMemo} from 'react';

interface FieldError {
    name: string;
    error: string;
}

interface FormContextProps {
    rawValues: Record<string, string>;
    setRawValue: (name: string, value: string) => void;
    setFormError: (e: FieldError) => void;
    errors: Record<string, string>;
    jumpToNext: (name: string) => void;
}

const FormContext = createContext<FormContextProps | null>(null);

export const useForm = () => {
    const ctx = useContext(FormContext);
    if (!ctx) {
        throw new Error('useForm must be used inside <FormProvider>');
    }
    return ctx;
};

interface FieldProps {
    name: string;
    label?: string;
    value?: string;
    defaultValue?: string;
    processValue?: (v: string) => string;
    helperText?: string;
    optional?: boolean;
    error?: string;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    validate?: (value?: string, rawValue?: string) => string | undefined;
    validateOnBlurInsideForm?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeValue?: (value: string, rawValue: string) => void;
}

export const useFieldProps = ({
    name,
    value,
    defaultValue,
    processValue = (v) => v,
    onBlur,
    validate,
    validateOnBlurInsideForm,
    onChange,
    onChangeValue,
}: FieldProps) => {
    const {rawValues, setRawValue, setFormError} = useForm();

    const rawValue = value ?? rawValues[name] ?? defaultValue ?? '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const processed = processValue(raw);
        setRawValue(name, raw);

        onChange?.(e);
        onChangeValue?.(processed, raw);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);

        if (validateOnBlurInsideForm && validate) {
            const err = validate(processValue(rawValue), rawValue);
            if (err) setFormError({name, error: err});
        }
    };

    return {
        name,
        value: rawValue,
        onBlur: handleBlur,
        onChange: handleChange,
    };
};

interface Provider
