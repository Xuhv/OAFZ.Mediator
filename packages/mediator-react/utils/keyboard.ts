export function isEnterOrSpace(event: KeyboardEvent | React.KeyboardEvent<any>) {
    return event.key === 'Enter' || event.key === ' ';
}