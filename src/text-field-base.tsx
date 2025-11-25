'use client';
import React from 'react';
import styles from './text-field-base.css';
import { useFieldProps } from './form-context';

export interface TextFieldBaseProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    endIcon?: React.ReactNode;
    helperText?: string;
    error?: string;
    inputComponent?: React.ElementType;
}

export const TextFieldBase = ({
    name,
    label,
    endIcon,
    helperText,
    error,
    inputComponent: InputComponent,
    ...rest
}: TextFieldBaseProps) => {
    const fieldProps = useFieldProps({
        name,
        label,
        helperText,
        error,
        disabled: rest.disabled,
        onBlur: rest.onBlur,
        onChange: rest.onChange,
    });

    const showFloatingLabel =
        !!fieldProps.value || document.activeElement?.getAttribute('name') === name;

    const InputTag = InputComponent ?? 'input';

    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <InputTag
                    {...rest}
                    {...fieldProps}
                    className={[
                        styles.field,
                        error ? styles.error : '',
                        rest.disabled ? styles.disabled : '',
                    ].join(' ')}
                />

                {label && (
                    <label
                        className={[
                            styles.label,
                            showFloatingLabel ? styles.labelFloating : '',
                            error ? styles.labelError : '',
                        ].join(' ')}
                    >
                        {label}
                    </label>
                )}

                {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
            </div>

            {error ? (
                <div className={styles.errorText}>{error}</div>
            ) : (
                helperText && <div className={styles.helperText}>{helperText}</div>
            )}
        </div>
    );
};
