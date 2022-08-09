import { PreconditionError } from './precondition-error';
/**
 * @param {string} - value
 * @return {string} - string
 */
function isString(value: unknown): value is string{
    return typeof value === 'string';
}

export function assertString(value: unknown, target = ''): asserts value is string {
    if (!isString(value)) {
        throw new PreconditionError(`${target} should be string`.trim());
    }
}
