const express = require('express');
const cache = require('memory-cache');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

let todos = [
  { id: '1', title: 'Learn React', isComplete: false },
  { id: '2', title: 'Build a Todo App', isComplete: true },
  { id: '3', title: 'Walk the dog', isComplete: false },
  { id: '4', title: 'Finish homework', isComplete: false },
  { id: '5', title: 'Read a book', isComplete: true },
  { id: '6', title: 'Go grocery shopping', isComplete: false },
  { id: '7', title: 'Exercise', isComplete: true },
  { id: '8', title: 'Write a blog post', isComplete: false },
  { id: '9', title: 'Clean the house', isComplete: false },
  { id: '10', title: 'Watch a movie', isComplete: true },
  { id: '11', title: 'Call a friend', isComplete: false },
  { id: '12', title: 'Cook dinner', isComplete: true },
  { id: '13', title: 'Take a nap', isComplete: false },
  { id: '14', title: 'Do laundry', isComplete: false },
  { id: '15', title: 'Plan vacation', isComplete: true },
  { id: '16', title: 'Attend meeting', isComplete: false },
  { id: '17', title: 'Start a new project', isComplete: true },
  { id: '18', title: 'Learn a new skill', isComplete: false },
  { id: '19', title: 'Water the plants', isComplete: false },
  { id: '20', title: 'Check email', isComplete: true },
  { id: '21', title: 'Take out the trash', isComplete: true },
  { id: '22', title: 'Go for a run', isComplete: false },
  { id: '23', title: 'Call mom', isComplete: false },
  { id: '24', title: 'Write code', isComplete: false }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

router.get('/todos', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const searchValue = req.query.searchValue || '';

  const cachedPage = cache.get('cachedPage');
  const cachedSearchValue = cache.get('cachedSearchValue');

  if (cachedPage === parseInt(req.query.page) && cachedSearchValue === searchValue) {
    const cachedData = cache.get('cachedData');
    const data = {
      data: cachedData.data,
      total: todos.length,
      next: cachedData.next,
      message: cachedData.message
    };
    return res.status(200).json(data);
  }

  await delay(1000); //Adding a delay to see the loader
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  let filteredTodos = todos;

  if (searchValue !== '') {
    filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(searchValue.toLowerCase()));
  } else {
    filteredTodos = todos.slice(startIndex, endIndex);
  }

  const next = todos.slice(pageSize * page).length;

  const data = {
    data: filteredTodos,
    total: todos.length,
    next: next ? page + 1 : null,
    message: 'Todos fetched successfully'
  };

  cache.put('cachedData', data);
  cache.put('cachedPage', page);
  cache.put('cachedSearchValue', searchValue);

  res.status(200).json(data);
});

router.post('/todo', (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const id = uuidv4();

    const newTodo = { id, title, isComplete: false };
    todos.push(newTodo);

    res.status(201).json({ todo: newTodo, message: 'Todo added successfully' });
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/todo', (req, res) => {
  try {
    const { todo: newTodo } = req.body;

    if (!newTodo || !newTodo.id) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const index = todos.findIndex((todo) => todo.id === newTodo.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todos[index] = newTodo;

    return res.status(200).json({ todo: newTodo, message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Error updating todo:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/todo/:id', (req, res) => {
  try {
    const todoId = req.params.id;
    const index = todos.findIndex((todo) => todo.id === todoId);
    const page = parseInt(req.query.page);

    if (index === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(index, 1);

    const concurrentElement = todos[page * 10 - 1];
    res.status(200).json({ message: 'Todo deleted successfully', todo: concurrentElement });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
