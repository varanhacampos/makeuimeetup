'use client';
import React from 'react';

export interface FormError {
    name: string;
    error: string;
}

interface FieldProps {
    name: string;
    value?: string;
    defaultValue?: string;
    processValue?: (v: string) => string;
    helperText?: string;
    optional?: boolean;
    error?: string;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeValue?: (value: string, raw: string) => void;
    validate?: (value: string | undefined, raw: string) => string | undefined;
    validateOnBlurInsideForm?: boolean;
}

interface FormContextValue {
    rawValues: Record<string, string>;
    setRawValue: (name: string, value: string) => void;
    setFormError: (err: FormError) => void;
    errors: Record<string, string>;
    jumpToNext: (name: string) => void;
}

const FormContext = React.createContext<FormContextValue | null>(null);

export const useForm = () => {
    const ctx = React.useContext(FormContext);
    if (!ctx) throw new Error('useForm must be used inside <FormProvider>');
    return ctx;
};

export const FormProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [rawValues, setRawValues] = React.useState<Record<string, string>>({});
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const setRawValue = (name: string, value: string) => {
        setRawValues((prev) => ({ ...prev, [name]: value }));
    };

    const setFormError = ({ name, error }: FormError) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const jumpToNext = () => {};

    return (
        <FormContext.Provider
            value={{
                rawValues,
                setRawValue,
                setFormError,
                errors,
                jumpToNext,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

// -------- useFieldProps ---------

export const useFieldProps = ({
    name,
    value,
    defaultValue,
    processValue = (v) => v,
    helperText,
    optional,
    error,
    disabled,
    onBlur,
    onChange,
    onChangeValue,
    validate,
    validateOnBlurInsideForm,
}: FieldProps) => {
    const { rawValues, setRawValue, setFormError } = useForm();

    const rawValue =
        value !== undefined
            ? value
            : rawValues[name] ?? defaultValue ?? '';

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
            if (err) setFormError({ name, error: err });
        }
    };

    return {
        name,
        value: rawValue,
        onBlur: handleBlur,
        onChange: handleChange,
        helperText,
        optional,
        error,
        disabled,
    };
};
