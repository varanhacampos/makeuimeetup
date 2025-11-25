'use client';
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from 'react';

interface FieldState {
    value?: string;
    rawValue?: string;
    error?: string;
}

interface FormContextValue {
    values: Record<string, string>;
    rawValues: Record<string, string>;
    errors: Record<string, string>;
    registerField: (name: string, ref: HTMLInputElement | null) => void;
    unregisterField: (name: string) => void;
    setFieldValue: (name: string, value: string, raw: string) => void;
    setFormError: (payload: { name: string; error: string }) => void;
    jumpToNext: (name: string) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useForm = () => {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error("useForm must be used inside <FormProvider>");
    return ctx;
};

export const FormProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const fieldsRef = useRef<Record<string, HTMLInputElement | null>>({});
    const [values, setValues] = useState<Record<string, string>>({});
    const [rawValues, setRawValues] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const registerField = useCallback((name: string, ref: HTMLInputElement | null) => {
        fieldsRef.current[name] = ref;
    }, []);

    const unregisterField = useCallback((name: string) => {
        delete fieldsRef.current[name];
    }, []);

    const setFieldValue = useCallback(
        (name: string, value: string, raw: string) => {
            setValues((prev) => ({ ...prev, [name]: value }));
            setRawValues((prev) => ({ ...prev, [name]: raw }));
        },
        []
    );

    const setFormError = useCallback(
        ({ name, error }: { name: string; error: string }) => {
            setErrors((prev) => ({ ...prev, [name]: error }));
        },
        []
    );

    const jumpToNext = useCallback(
        (name: string) => {
            const names = Object.keys(fieldsRef.current);
            const index = names.indexOf(name);
            if (index >= 0 && index < names.length - 1) {
                const nextField = fieldsRef.current[names[index + 1]];
                nextField?.focus();
            }
        },
        []
    );

    const contextValue = useMemo(
        () => ({
            values,
            rawValues,
            errors,
            registerField,
            unregisterField,
            setFieldValue,
            setFormError,
            jumpToNext,
        }),
        [values, rawValues, errors, jumpToNext]
    );

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};

interface UseFieldPropsConfig {
    name: string;
    label?: string;
    value?: string;
    defaultValue?: string;
    processValue?: (input: string) => string;
    helperText?: string;
    optional?: boolean;
    error?: string;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    validate?: (value: string, rawValue: string) => string | undefined;
    validateOnBlurInsideForm?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeValue?: (value: string, rawValue: string) => void;
}

export const useFieldProps = ({
    name,
    label,
    value,
    defaultValue,
    processValue,
    helperText,
    optional,
    error,
    disabled,
    onBlur,
    validate,
    validateOnBlurInsideForm,
    onChange,
    onChangeValue,
}: UseFieldPropsConfig) => {
    const {
        registerField,
        unregisterField,
        setFieldValue,
        errors,
        rawValues,
        values,
    } = useForm();

    const internalRef = useRef<HTMLInputElement | null>(null);

    const handleRef = useCallback((ref: HTMLInputElement | null) => {
        internalRef.current = ref;
        registerField(name, ref);
    }, [name, registerField]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);

        const raw = event.target.value;
        const processed = processValue ? processValue(raw) : raw;

        if (validateOnBlurInsideForm && validate) {
            const err = validate(processed, raw);
            if (err) {
                setFieldValue(name, processed, raw);
            }
        }
    }, [name,]);
