import axios from 'axios';
import { FetchServerResponse } from '../types';
import { serverResponseForToast } from '../constants';

type getTodosType = {
  pageNumber: number;
  searchValue: string;
};

let cancelPreviousRequest: any;

export async function getTodos({ pageNumber, searchValue }: getTodosType): Promise<FetchServerResponse> {
  if (cancelPreviousRequest) {
    cancelPreviousRequest();
  }

  try {
    const res = await axios.get('/api/todos', {
      params: { page: pageNumber, searchValue },
      cancelToken: new axios.CancelToken(function executor(c) {
        cancelPreviousRequest = c;
      })
    });

    return {
      total: res.data.total,
      todos: res.data.data,
      next: res.data.next,
      msg: `${res.data.message} with code ${res.status}`,
      status: serverResponseForToast.SUCCESS
    };
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    }
    return {
      total: 0,
      todos: [],
      next: false,
      msg: `${error.message}`,
      status: serverResponseForToast.ERROR
    };
  }
}
