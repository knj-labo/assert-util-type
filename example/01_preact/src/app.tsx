import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'
import { Nominal, assertFilledString} from "assert-util-types";

type FilledString = Nominal<string, 'FilledString'>;
type TodoId = Nominal<FilledString, 'TodoId'>

function assertTodoId(value: unknown): asserts value is TodoId {
    assertFilledString(value);
}

function asToDoId(value: unknown): TodoId {
    assertTodoId(value);
    return value;
}

export function App() {
  const id = asToDoId('1');
  console.log(id)
  return (
    <>
    </>
  )
}
