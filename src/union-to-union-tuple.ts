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
export type UnionToUnionTuple<T> = Tuple<T, UnionToTuple<T>["length"]>;