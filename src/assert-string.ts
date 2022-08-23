import { PreconditionError } from './precondition-error';
import { Nominal } from './nominal';
import { serialize } from "./serialize";

type FilledString = Nominal<string, 'FillString'>;

function isString(value: unknown): value is string{
    return typeof value === 'string';
}

function isFilledString(value: unknown): value is string {
    return isString(value) &&  value !== '';
}

/**
 * when it is not the string type, throw error
 * @param {string} - value
 */
export function assertString(value: unknown, target = ''): asserts value is string {
    if (!isString(value)) {
        throw new PreconditionError(`${target} should be string`.trim());
    }
}

export function assertFilledString(value: unknown, target = ''): asserts value is FilledString {
    if(!isFilledString(value)) {
        throw new PreconditionError(`${target} should have least 1 character`.trim());
    }
}

export function asString(value: unknown, target = ''): string {
    assertString(value, target);
    return value;
}

export function asFilledString(value: unknown, target = ''): string {
    assertFilledString(value, target);
    return value;
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Use case for assertString function', () => {
        describe('“nomal usecase” the values return true are', () => {
            ['string'].forEach((value) => {
                test(serialize('string'), () => {
                    expect(() => assertString(value, '')).not.toThrow();
                });
                test(serialize(value), () => {
                    expect(asString(value, '')).toBe(value);
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
                test(serialize(value), () => {
                    expect(() => asFilledString(value, '')).toThrow();
                });
                test(serialize(value), () => {
                    expect(() => asString(value, '')).toThrow();
                });
            });
            test(serialize(""), () => {
                expect(() => asFilledString("", '')).toThrow();
            });
        });
    });
}