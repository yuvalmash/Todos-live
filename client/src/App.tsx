import React, { useEffect, useState, useRef, useCallback } from 'react';
import { serverResponseForToast } from './constants';
import { Box, Toolbar, Typography } from '@mui/material';
import { uniqueTodos } from './utils/helpers';
import { deleteTodo } from './api/deleteTodo';
import { ServerResponse, Todo } from './types';
import { postTodo } from './api/postTodo';
import { getTodos } from './api/getTodos';
import { updateTodo } from './api/updateTodo';
import { ThemeProvider } from '@mui/material/styles';
import TodosTable from './components/todosTable/TodosTable';
import Navbar from './components/navbar/Navbar';
import AddTodoBar from './components/addTodoBar/AddTodoBar';
import Loader from './components/loader/Loader';
import SearchTodoBar from './components/searchTodoBar/SearchTodoBar';
import Toast from './components/toast/Toast';
import { subHeaderTheme } from './themes/subHeaderTheme';

const App: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreTodos, setHasMoreTodos] = useState<boolean>();
  const [toastObj, setToastObj] = useState<ServerResponse>({
    msg: '',
    status: serverResponseForToast.SUCCESS
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [todosCount, setTodosCount] = useState<number>(0);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const observer: React.MutableRefObject<IntersectionObserver | null> = useRef(null);

  const handleLastTodoElementRef: React.RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreTodos) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreTodos]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { total, todos, next, msg, status } = await getTodos({
          pageNumber,
          searchValue
        });
        setTodosCount(total);
        setTodos((prevTodos) => {
          return [...uniqueTodos(prevTodos, todos)];
        });
        setHasMoreTodos(next);
        handleToastOpen({ msg, status });
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, searchValue]);

  async function handleAddTodo(title: string) {
    const res = await postTodo({ title });
    setTodos((prevTodos) => uniqueTodos(prevTodos, [res.todo as Todo]));
    setTodosCount((prevCount) => prevCount + 1);
    handleToastOpen(res);
  }

  async function handleUpdateTodo(newTodo: Todo) {
    const res = await updateTodo(newTodo);
    const updatedTodos = todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo));
    setTodos(updatedTodos);
    handleToastOpen(res);
  }

  async function handleDeleteTodo(id: number) {
    const res = await deleteTodo(id, pageNumber);
    const concurrentTodo = res.todo as Todo;

    if (res.status === serverResponseForToast.SUCCESS) {
      setTodos((prevTodos) => {
        const newTodos = prevTodos.filter((todo) => todo.id !== id);
        return concurrentTodo ? uniqueTodos(newTodos, [concurrentTodo as Todo]) : [...newTodos];
      });

      setTodosCount((prevCount) => prevCount - 1);
      handleToastOpen(res);
    }
  }

  function handleToastOpen(res: ServerResponse) {
    setIsToastOpen(true);
    setToastObj(res);
  }

  return (
    <div>
      <Toast isToastOpen={isToastOpen} setIsToastOpen={setIsToastOpen} toastObj={toastObj} />
      <Navbar />
      <ThemeProvider theme={subHeaderTheme}>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '20px 0',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#f5f5f5'
          }}
        >
          <SearchTodoBar setTodos={setTodos} setSearchValue={setSearchValue} setPageNumber={setPageNumber} searchValue={searchValue} />
          <Toolbar>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              Total todos in the DB: {todosCount}
            </Typography>
          </Toolbar>
          <AddTodoBar addTodo={handleAddTodo} />
        </Box>
      </ThemeProvider>
      <Box sx={{ backgroundColor: '#f5f5f5', margin: '0 auto' }}>
        {todos.length > 0 && <TodosTable todos={todos} updateTodo={handleUpdateTodo} deleteTodo={handleDeleteTodo} lastTodoElementRef={handleLastTodoElementRef} />}
        {isLoading && <Loader />}
      </Box>
    </div>
  );
};

export default App;
