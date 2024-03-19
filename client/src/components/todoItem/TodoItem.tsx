import React, { useState, forwardRef } from 'react';
import { Todo } from '../../types';
import { Card, CardActionArea, ListItemText, TextField, CardActions, CardContent, Typography, Box } from '@mui/material';
import './TodoItem';
import CustomIcon from './customIcon/CustomIcon';

type TodoItemProps = {
  todo: Todo;
  updateTodo: (id: Todo) => void;
  deleteTodo: (id: number) => void;
  backgroundColor: string;
};

const TodoItem: React.ForwardRefRenderFunction<HTMLDivElement, TodoItemProps> = ({ todo, updateTodo, deleteTodo, backgroundColor }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isComplete, setIsComplete] = useState(todo.isComplete);
  const [editingValue, setEditingValue] = useState(todo.title);

  const handleToggleIsComplete = (todo: Todo) => {
    todo.isComplete = !todo.isComplete;
    updateTodo(todo);
    setIsComplete((prevStatus) => !prevStatus);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingValue(event.target.value);
  };

  const handleTitleTodoChange = (todo: Todo) => {
    todo.title = editingValue;
    updateTodo(todo);
    handleToggleEdit();
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  return (
    <Card ref={ref} variant='outlined' sx={{ width: '20vw', height: '20vw', backgroundColor }}>
      <CardActionArea
        sx={{
          display: 'flex',
          height: '80%',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#B7AFA3',
            borderRadius: '4px'
          }
        }}
      >
        <CardContent>
          {isEditing ? (
            <TextField value={editingValue} placeholder={todo.title} onChange={(event) => handleInputChange(event)} variant='outlined' multiline minRows={2} />
          ) : (
            <>
              <ListItemText sx={isComplete ? { color: '#757575', textDecoration: 'line-through' } : null}>
                <Typography>{todo.title}</Typography>
              </ListItemText>
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0
        }}
      >
        <Box>
          <CustomIcon iconType='delete' onClick={() => handleDeleteTodo(todo.id)} />
          {isComplete ? <CustomIcon iconType='check' onClick={() => handleToggleIsComplete(todo)} /> : <CustomIcon iconType='uncheck' onClick={() => handleToggleIsComplete(todo)} />}
        </Box>
        <Box>
          {isEditing ? (
            <>
              <CustomIcon iconType='save' onClick={() => handleTitleTodoChange(todo)} />
              <CustomIcon iconType='cancel' onClick={() => handleToggleEdit()} />
            </>
          ) : (
            <CustomIcon iconType='edit' onClick={() => handleToggleEdit()} />
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default forwardRef(TodoItem);
