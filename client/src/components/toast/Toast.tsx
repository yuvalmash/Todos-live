import { Alert, Snackbar } from '@mui/material';
import { ServerResponse } from '../../types';

type ToastType = {
  isToastOpen: boolean;
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toastObj: ServerResponse;
};

export default function Toast({ isToastOpen, setIsToastOpen, toastObj }: ToastType) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isToastOpen}
      autoHideDuration={2000}
      onClose={() => setIsToastOpen(false)}
    >
      <Alert onClose={() => setIsToastOpen(false)} severity={toastObj.status || undefined}>
        {toastObj.msg}
      </Alert>
    </Snackbar>
  );
}
