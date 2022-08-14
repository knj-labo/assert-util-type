import { assertObject } from "./assert-object";
import { PreconditionError } from "./precondition-error";
import { RemoveOptionalProperties } from "./remove-optional-properties";
import { UnionToUnionTuple } from "./union-to-union-tuple";
/**
 * property指定は全てユニークであることを保証する
 */
function isMatchedType<T extends object>(
    v: unknown,
    props: UnionToUnionTuple<keyof RemoveOptionalProperties<T>>,
    errorPropsRef: string[],
    target = ""
): v is T {
    assertObject(v, target);
    if (new Set(props).size !== props.length) {
        throw new Error("Invalid props");
    }
    return props
        .map((prop) => {
            if (typeof prop !== "string") {
                throw new Error("Invalid prop");
            }
            // 指定されたpropertyがあるか確認
            const within = prop in v;
            // 指定されたpropertyがなければエラー参照に記録
            if (!within) {
                errorPropsRef.push(prop); // mutate
            }
            return within;
        })
        .every((flag) => flag);
}

/**
 * @param {object}  object - validated object
 * @param {array}   array  - validated props name
 */
export function assertMatchedType<T extends object>(
    v: unknown,
    props: UnionToUnionTuple<keyof RemoveOptionalProperties<T>>,
    target = ""
): asserts v is T {
    const errorPropsRef: string[] = []; // 子に値を格納させるための空配列参照
    if (!isMatchedType(v, props, errorPropsRef, target)) {
        // ここに該当するとき errorPropsRef 配列の中身にはエラー箇所が詰まっている。
        throw new Error(
            `${target} should be aligned type. ${
                0 < errorPropsRef.length ? `[${errorPropsRef.join(", ")}]` : ""
            }`.trim()
        );
    }
}

if (import.meta.vitest) {
    type I1 = {
        a: string;
        b: number;
        c: boolean;
    };
    type I2 = {
        a: string;
        b?: number;
        c?: boolean;
    };

    const obj: unknown = { a: 4, b: '46', c: true };
    const { describe, test, expect } = import.meta.vitest

    describe('assertMatchedType()', () => {
        describe('指定のプロパティがすべて含まれるので例外とならない', () => {
            test('case 1', () => {
                expect(() => {
                    assertMatchedType<I1>({ a: 'a', b: 46, c: true }, ['a', 'b', 'c']);
                }).not.toThrow();
            });

            test('case 2', () => {
                expect(() => {
                    assertMatchedType<I2>(obj, ['a']);
                }).not.toThrow();
            });
        });

        describe('指定のプロパティがすべて含まれないので例外となり、不足プロパティがエラーメッセージに含まれる', () => {
            test('case 1', () => {
                expect(() => {
                    assertMatchedType<I1>({ a: 'a', b: 46 }, ['a', 'b', 'c'], 'testObject');
                }).toThrow(
                    new PreconditionError('testObject should be aligned type. [c]')
                );
            });

            test('case 2', () => {
                expect(() => {
                    assertMatchedType<I1>({ a: 'a' }, ['a', 'b', 'c'], 'testObject');
                }).toThrow(
                    new PreconditionError('testObject should be aligned type. [b, c]')
                );
            });

            test('case 3', () => {
                expect(() => {
                    assertMatchedType<I1>({}, ['a', 'b', 'c'], 'testObject');
                }).toThrow(
                    new PreconditionError('testObject should be aligned type. [a, b, c]')
                );
            });
        });
    });
}