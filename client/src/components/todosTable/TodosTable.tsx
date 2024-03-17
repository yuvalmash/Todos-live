import TodoItem from '../todoItem/TodoItem';
import { Todo } from '../../types';

type TodosTableProps = {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  lastTodoElementRef: React.Ref<HTMLLIElement>;
};

export default function TodosTable({ todos, updateTodo, deleteTodo, lastTodoElementRef }: TodosTableProps) {
  return (
    <div>
      {todos.map((todo: Todo, index: number) => {
        if (todos.length === index + 1) return <TodoItem ref={lastTodoElementRef} key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />;
        else return <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />;
      })}
    </div>
  );
}
