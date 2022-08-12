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
 * any型を0に変換
 */
type AnyAs0<T> = {
    [P in keyof T]: TypeEqual<T[P], any> extends true ? 0 : T[P];
};

/**
 * unknown型を0に変換
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
export type RemoveOptionalProperties<T> = {
    [P in keyof RemoveNeverProperties<
        UndefinedAsNever<OptionalAsUndefined<UnknownAs0<AnyAs0<T>>>>
        >]: T[P];
};