import { assertFilledString } from "assert-util-types";
import { useTodoFetch } from "./use-todo-fetch";
import type { TodoId } from "./type";

type Todo = {
    id: TodoId;
    todo: string;
    completed: boolean;
    userId: string;
}

function assertTodoId(value: unknown): asserts value is TodoId {
    assertFilledString(value);
}

function asToDoId(value: unknown): TodoId {
    assertTodoId(value);
    return value;
}

export function App() {
  const { data, error } = useTodoFetch<Todo>(asToDoId('1'));
  if (error) return <p>There is an error.</p>
  if (!data) return <p>Loading...</p>
  return <p>{data.todo}</p>
}
