/**
 * @see https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
 */
type TypeEqual<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
        (<T>() => T extends Y ? 1 : 2) ? true : false;

/**
 * if it have never type, remove never type using Omit
 * @see https://github.com/ProgramacaoAplicada2021/Hamilko_AgendaMeteorol-gica/blob/fb699a253e37f14d60ab8d86b9f6f55295cafa6e/src/common/types/utils.type.ts#L5
 */
export type RemoveNeverProperties<T> = Omit<
    T,
    {
        [P in keyof T]: T[P] extends never ? P : never
    }[keyof T]
    >

/**
 * if props is any type, covert to 0
 */
type AnyAs0<T> = {
    [P in keyof T]: TypeEqual<T[P], any> extends true ? 0 : T[P];
};

/**
 * if props is unknown type, covert to 0
 */
type UnknownAs0<T> = {
    [P in keyof T]: TypeEqual<T[P], unknown> extends true ? 0 : T[P];
};

/**
 * if props is optional, convert to undefined
 */
type OptionalAsUndefined<T> = {
    [P in keyof T]: T[P] extends NonNullable<T[P]> ? T[P] : undefined;
};

/**
 * if props is underfined, convert to never
 */
type UndefinedAsNever<T> = {
    [P in keyof T]-?: T[P] extends undefined ? never : T[P];
};

/**
 * { a?: string; b: number; c?: any; d: any } => { b: number; d: any }
 */
export type RemoveOptionalProperties<T> = {
    [P in keyof RemoveNeverProperties<UndefinedAsNever<OptionalAsUndefined<UnknownAs0<AnyAs0<T>>>>>]: T[P];
};