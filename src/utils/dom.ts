export function createChangeEvent(
    element: HTMLInputElement,
    value: string
): React.ChangeEvent<HTMLInputElement> {
    return {
        target: {
            ...element,
            value,
        },
        currentTarget: {
            ...element,
            value,
        },
    } as any;
}
