const CreditCardInput = ({inputRef, value, defaultValue, onChange, ...other}: Props) => {
    const [selfValue, setSelfValue] = React.useState(defaultValue ?? '');
    const ref = React.useRef<HTMLInputElement | null>(null);

    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue = (isControlledByParent ? value : selfValue) as string;

    const handleChangeValue = React.useCallback(
        (newFormattedValue: string) => {
            if (!isControlledByParent) {
                setSelfValue(newFormattedValue);
            }
            if (ref.current) {
                onChange?.(createChangeEvent(ref.current, newFormattedValue));
            }
        },
        [isControlledByParent, onChange]
    );

    // 🔧 NOVA LÓGICA SEM RIFM
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d]/g, '');
        const formatted = format(raw);
        handleChangeValue(formatted);
    };

    return (
        <input
            {...other}
            type="text"
            inputMode="decimal"
            maxLength={getCreditCardNumberLength(controlledValue) + 3}
            onChange={handleInputChange}
            value={controlledValue}
            ref={combineRefs(inputRef, ref)}
        />
    );
};
