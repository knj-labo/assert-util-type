import { PreconditionError } from './precondition-error';
import { serialize } from "./serialize";

function isObject(value: unknown): value is Record<string, unknown> {
    if (typeof value !== 'object' || Array.isArray(value)) {
        return false;
    }
    return value !== null;
}

/**
 * when it has not the object type, throw error
 * @param {string} - value
 */
export function assertObject(
    value: unknown,
    target = ''
): asserts value is Record<string, unknown> {
    if (!isObject(value)) {
        throw new PreconditionError(`${target} should be object`.trim());
    }
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Use case for assertString function', () => {
        describe('“nomal usecase” the values return true are', () => {
            [
                {},
            ].forEach((value) => {
                test(serialize(value), () => {
                    expect(() => assertObject(value, '')).not.toThrow();
                });
            });
        });

        describe('“exception usecase” the values return false are', () => {
            [
                'a',
                1,
                BigInt(1),
                null,
                undefined,
                true,
                false,
                Symbol('symbol'),
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                (): void => {},
            ].forEach((value) => {
                test(serialize(value), () => {
                    expect(() => assertObject(value, '')).toThrow();
                });
            });
        });
    });
}