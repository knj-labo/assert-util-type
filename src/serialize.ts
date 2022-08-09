export function serialize(value: unknown): string {
    if (typeof value === 'undefined') {
        return 'undefined';
    }
    if (typeof value === 'symbol') {
        return 'symbol';
    }
    if (typeof value === 'function') {
        return 'function';
    }
    if (typeof value === 'bigint') {
        return value.toString();
    }
    return JSON.stringify(value);
}