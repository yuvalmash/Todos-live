import { serverResponseForToast } from './constants';

export type Todo = {
  id: number;
  title: string;
  isComplete: boolean;
};

export type Columns = {
  Header: string;
  accessor: string;
};

export type FetchServerResponse = {
  total: number;
  todos: Todo[];
  next: boolean;
  msg: string;
  status: typeof serverResponseForToast.ERROR | typeof serverResponseForToast.SUCCESS;
};

export type ServerResponse = {
  msg: string;
  status: typeof serverResponseForToast.ERROR | typeof serverResponseForToast.SUCCESS;
  todo?: Todo;
};
