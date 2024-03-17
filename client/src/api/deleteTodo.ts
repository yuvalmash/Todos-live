import axios from 'axios';
import { ServerResponse } from '../types';
import { serverResponseForToast } from '../constants';

let cancelPreviousRequest: any;

export async function deleteTodo(id: number, pageNumber: number): Promise<ServerResponse> {
  if (cancelPreviousRequest) {
    cancelPreviousRequest();
  }
  try {
    const res = await axios.delete(`/api/todo/${id}`, {
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(function executor(c) {
        cancelPreviousRequest = c;
      })
    });
    return {
      msg: `${res.data.message} with code ${res.status}`,
      status: serverResponseForToast.SUCCESS,
      todo: res.data.todo
    };
  } catch (error: any) {
    return {
      msg: `${error.response.statusText} with code ${error.response.status}`,
      status: serverResponseForToast.ERROR
    };
  }
}
