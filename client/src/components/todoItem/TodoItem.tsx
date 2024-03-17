import React, { useState, forwardRef } from 'react';
import { Todo } from '../../types';
import { ListItem, IconButton, ListItemButton, Checkbox, ListItemIcon, ListItemText, TextField, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type TodoItemProps = {
  todo: Todo;
  updateTodo: (id: Todo) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem: React.ForwardRefRenderFunction<HTMLLIElement, TodoItemProps> = ({ todo, updateTodo, deleteTodo }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState('');

  const handleToggleIsComplete = (todo: Todo) => {
    todo.isComplete = !todo.isComplete;
    updateTodo(todo);
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

  const editIcon = (
    <Tooltip title='Edit Todo' placement='top'>
      <IconButton edge='start' size='large' color='primary' aria-label='edit-todo' onClick={() => handleToggleEdit()}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
  const cancelIcon = (
    <Tooltip title='Cancel Edit' placement='top'>
      <IconButton edge='start' size='large' color='primary' aria-label='edit-todo' onClick={() => handleToggleEdit()}>
        <HighlightOffIcon />
      </IconButton>
    </Tooltip>
  );
  const saveIcon = () => (
    <Tooltip title='Save Todo' placement='top'>
      <IconButton edge='start' size='large' color='primary' aria-label='edit-todo' onClick={() => handleTitleTodoChange(todo)}>
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <ListItem
      sx={{ padding: '15px' }}
      ref={ref}
      divider
      className='todo-item'
      key={todo.id}
      secondaryAction={
        <>
          <Tooltip title='Delete Todo' placement='top'>
            <IconButton edge='start' size='large' color='primary' aria-label='delete-todo' onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {isEditing ? (
            <>
              {saveIcon()} {cancelIcon}
            </>
          ) : (
            editIcon
          )}
        </>
      }
    >
      {isEditing ? (
        <TextField value={editingValue} placeholder={todo.title} onChange={(event) => handleInputChange(event)} variant='outlined' fullWidth />
      ) : (
        <ListItemButton>
          <ListItemIcon>
            <Checkbox checked={todo.isComplete} onChange={() => handleToggleIsComplete(todo)} />
          </ListItemIcon>
          <ListItemText
            sx={todo.isComplete ? { color: '#757575', textDecoration: 'line-through' } : null}
            primary={
              <div>
                {todo.id} {todo.title}
              </div>
            }
          />
        </ListItemButton>
      )}
    </ListItem>
  );
};

export default forwardRef(TodoItem);
