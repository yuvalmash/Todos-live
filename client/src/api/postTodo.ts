import axios from 'axios';
import { ServerResponse } from '../types';

export async function postTodo({ title }: { title: string }): Promise<ServerResponse> {
  const res = await axios.post('/api/todo', { title });
  try {
    return {
      msg: `${res.data.message} with code ${res.status}`,
      status: 'success',
      todo: res.data.todo
    };
  } catch (error: any) {
    return {
      msg: `${error.response.statusText} with code ${error.response.status}`,
      status: 'error'
    };
  }
}
