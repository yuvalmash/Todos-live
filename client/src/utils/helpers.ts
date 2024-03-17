import { Todo } from '../types';

export function uniqueTodos(prevTodos: Todo[], todos: Todo[]) {
  const combinedArray = prevTodos.concat(todos);
  return combinedArray.filter((item, index) => {
    return combinedArray.findIndex((innerItem) => innerItem.id === item.id) === index;
  });
}
