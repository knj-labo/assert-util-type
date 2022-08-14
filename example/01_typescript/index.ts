import { Nominal, assertFilledString } from "assert-util-types";

type FilledString = Nominal<string, 'FillString'>;
type UserId = Nominal<FilledString, "UserId">;

function assertUserId(value: unknown): asserts value is UserId {
    return assertFilledString(value);
}

function asUserId(value: unknown): UserId {
    assertUserId(value);
    return value;
}

async function fetchUser(id: string): Promise<string> {
    return id;
}

export async function getUser(): Promise<UserId> {
    return asUserId(await fetchUser('user-id'));
}