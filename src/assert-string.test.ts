import { describe, test, expect} from "vitest";
import { serialize } from "./serialize";

import { assertString } from "./assert-string";

describe('assertFilledString()を使用した場合', () => {
    describe('【正常系】true を返すのは', () => {
        ['a'].forEach((v) => {
            test(serialize(v), () => {
                expect(() => assertString(v, '')).not.toThrow();
            });
        });
    });

    describe('【異常系】false を返すのは', () => {
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
        ].forEach((v) => {
            test(serialize(v), () => {
                expect(() => assertString(v, '')).toThrow();
            });
        });
    });
});
