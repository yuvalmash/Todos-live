import TodoItem from '../todoItem/TodoItem';
import { Todo } from '../../types';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { noteTheme } from '../../themes/noteTheme';

type TodosTableProps = {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  lastTodoElementRef: React.Ref<HTMLDivElement>;
};

export default function TodosTable({ todos, updateTodo, deleteTodo, lastTodoElementRef }: TodosTableProps) {
  const backgroundColorArr = ['#fff9b1', '#daf7a1', '#FFCEE0', '#b1d3f6'];

  return (
    <ThemeProvider theme={noteTheme}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '80vw', margin: '0 auto', gap: '10px', justifyContent: 'center' }}>
        {todos.map((todo: Todo, index: number) => {
          const backgroundColor = backgroundColorArr[index % backgroundColorArr.length];
          return <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} backgroundColor={backgroundColor} ref={index === todos.length - 1 ? lastTodoElementRef : null} />;
        })}
      </Box>
    </ThemeProvider>
  );
}
