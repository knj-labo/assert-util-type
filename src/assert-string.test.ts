import { describe, test, expect} from "vitest";
import { serialize } from "./serialize";

import { assertString } from "./assert-string";

describe('assertFilledString()を使用した場合', () => {
    describe('true を返すのは', () => {
        ['a'].forEach((v) => {
            test(serialize(v), () => {
                expect(() => assertString(v, '')).not.toThrow();
            });
        });
    });
});
