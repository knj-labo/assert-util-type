import { PreconditionError } from './precondition-error';
import { serialize } from "./serialize";

function isFilledArray<T>(value: unknown): value is T[] {
    if (!Array.isArray(value)) {
        return false;
    }
    return 0 < value.length;
}

/**
 * when there is no item in array, throw error
 * @param {unknown} - value
 */
export function assertFilledArray<T>(
    value: unknown,
    target = ''
): asserts value is T[] {
    if (!isFilledArray(value)) {
        throw new PreconditionError(`${target} should have least 1 item`.trim());
    }
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Use case for assertString function', () => {
        describe('“nomal usecase” the values return true are', () => {
            [
                [''],
                [ 1, 2, 3],
                // eslint-disable-next-line no-sparse-arrays
                [,]
            ].forEach((value) => {
                test(serialize(value), () => {
                    expect(() => assertFilledArray(value, '')).not.toThrow();
                });
            });
        });

        describe('“exception usecase” the values return false are', () => {
            [
                {},
                [],
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
                    expect(() => assertFilledArray(value, '')).toThrow();
                });
            });
        });
    });
}