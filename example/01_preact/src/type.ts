import { Nominal } from "assert-util-types";

type FilledString = Nominal<string, 'FilledString'>;
export type TodoId = Nominal<FilledString, 'TodoId'>
