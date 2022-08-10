import { PreconditionError } from "./precondition-error";

type I1 = {
    a: string;
    b: number;
    c: boolean;
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
        k: infer I
    ) => void
    ? I
    : never;

type LastOf<T> = UnionToIntersection<
    T extends any ? () => T : never
    > extends () => infer R
    ? R
    : never;

type Push<T extends any[], V> = [...T, V];

type UnionToTuple<
    T,
    L = LastOf<T>,
    N = [T] extends [never] ? true : false
    > = true extends N ? [] : Push<UnionToTuple<Exclude<T, L>>, L>;

type Tuple<TItem, TLength> = [TItem, ...TItem[]] & {
    length: TLength;
};

/**
 * Tuple<string, 3> は [string, string, string] を返す
 * それを応用して 'a' | 'b' を ['a' | 'b', 'a' | 'b'] にする
 *
 * 'a' | 'b'
 *   => ['a' | 'b', 'a' | 'b']
 * 'a' | 'b' | 'c'
 *   => ['a' | 'b' | 'c', 'a' | 'b' | 'c', 'a' | 'b' | 'c']
 */
type UnionToUnionTuple<T> = Tuple<T, UnionToTuple<T>["length"]>;

/**
 * 型パズルを検証するため
 */
type TypeEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
        ? 1
        : 2
    ? true
    : false;

/**
 * neverがある場合、Pick<T, U> で除去
 */
type RemoveNeverProperties<T> = Pick<
    T,
    {
        [P in keyof T]: [T[P]] extends [never] ? never : P;
    }[keyof T]
    >;

/**
 * any型を numeric literal型(0) に変換
 */
type AnyAs0<T> = {
    [P in keyof T]: TypeEqual<T[P], any> extends true ? 0 : T[P];
};

/**
 * unknown型を numeric literal型(0) に変換
 */
type UnknownAs0<T> = {
    [P in keyof T]: TypeEqual<T[P], unknown> extends true ? 0 : T[P];
};

/**
 * optionalを undefined に変換
 */
type OptionalAsUndefined<T> = {
    [P in keyof T]: T[P] extends NonNullable<T[P]> ? T[P] : undefined;
};

/**
 * undefinedを never に変換
 */
type UndefinedAsNever<T> = {
    [P in keyof T]-?: T[P] extends undefined ? never : T[P];
};

/**
 * { a?: string; b: number; c?: any; d: any } を
 * { b: number; d: any } だけにする。
 *
 * AnyAs0<T> がないと ?: any への対応が漏れるので注意。
 */
type RemoveOptionalProperties<T> = {
    [P in keyof RemoveNeverProperties<
        UndefinedAsNever<OptionalAsUndefined<UnknownAs0<AnyAs0<T>>>>
        >]: T[P];
};

function isObject(v: unknown): v is Record<string, unknown> {
    if (typeof v !== "object") {
        return false;
    }
    return v !== null;
}

function assertObject(
    v: unknown,
    target = ""
): asserts v is Record<string, unknown> {
    if (!isObject(v)) {
        throw new Error(`${target} should be object`.trim());
    }
}

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
    const { describe, test, expect } = import.meta.vitest

    describe('assertMatchedType()', () => {
        test('指定のプロパティがすべて含まれるので例外とならない', () => {
            expect(() => {
                assertMatchedType<I1>({ a: 'a', b: 46, c: true }, ['a', 'b', 'c']);
            }).not.toThrow();
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