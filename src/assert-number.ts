import { PreconditionError } from './precondition-error';
import { serialize } from "./serialize";

function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

function assertNumber(value: unknown, target = ''): asserts value is number {
    if (!isNumber(value)) {
        throw new PreconditionError(`${target} should be number`.trim());
    }
}

function asNumber(value: unknown): number {
    const n = Number(value);
    assertNumber(n);
    return n;
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Use case for assertString function', () => {
        describe('“nomal usecase” the values return true are', () => {
            [
                1,
                1.1
            ].forEach((value) => {
                test(serialize(value), () => {
                    expect(() => assertNumber(value, '')).not.toThrow();
                });
                test(serialize(value), () => {
                    expect(asNumber(value)).toBe(value);
                });
            });
        });

        describe('“exception usecase” the values return false are', () => {
            [
                {},
                [],
                'string',
                '1',
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
                    expect(() => assertNumber(value, '')).toThrow();
                });
            });
        });
    });
}