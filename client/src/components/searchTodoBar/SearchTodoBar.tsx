import { Box, TextField } from '@mui/material';
import React from 'react';
import { Todo } from '../../types';

type SearchTodoBarProps = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | []>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
};

export default function SearchTodoBar({ setTodos, setSearchValue, setPageNumber, searchValue }: SearchTodoBarProps) {
  function handleSearch(searchValue: string) {
    setSearchValue(searchValue);
    setPageNumber(1);
    setTodos([]);
  }

  return (
    <Box>
      <TextField type='text' label="search todo's title" value={searchValue} onChange={(event) => handleSearch(event.target.value)} />
    </Box>
  );
}
