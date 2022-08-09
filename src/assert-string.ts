import { PreconditionError } from './precondition-error';
import {serialize} from "./serialize";

/**
 * to guarantee string type
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

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Use case for assertString function', () => {
        describe('“nomal usecase” the values return true are', () => {
            ['a'].forEach((value) => {
                test(serialize(value), () => {
                    expect(() => assertString(value, '')).not.toThrow();
                });
            });
        });

        describe('“exception usecase” the values return false are', () => {
            [
                [],
                {},
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
                    expect(() => assertString(value, '')).toThrow();
                });
            });
        });
    });
}