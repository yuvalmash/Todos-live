import { Box, Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';

type AddTodoBarProps = {
  addTodo: (title: string) => void;
};

export default function AddTodoBar({ addTodo }: AddTodoBarProps) {
  const [newTitle, setNewTitle] = useState<string>('');

  const handleAddTodo = () => {
    if (newTitle.trim() !== '') {
      addTodo(newTitle.trim());
      setNewTitle('');
    }
  };

  return (
    <Box sx={{ width: '33%' }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddTodo();
        }}
      >
        <FormControl
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <TextField type='text' label='Title of new todo' value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
          <Button disabled={newTitle.trim() === ''} type='submit' variant='contained' color='secondary' size='large' sx={{ margin: '0 20px', height: '100%' }}>
            Add
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
