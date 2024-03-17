import axios from 'axios';
import { ServerResponse, Todo } from '../types';
import { serverResponseForToast } from '../constants';

export async function updateTodo(todo: Todo): Promise<ServerResponse> {
  try {
    const res = await axios.put('/api/todo', { todo });
    return {
      msg: `${res.data.message} with code ${res.status}`,
      status: serverResponseForToast.SUCCESS
    };
  } catch (error: any) {
    return {
      msg: `${error.response.statusText} with code ${error.response.status}`,
      status: serverResponseForToast.ERROR
    };
  }
}
