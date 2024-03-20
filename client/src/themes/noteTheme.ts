import { Breakpoints, createTheme } from '@mui/material';
import { createBreakpoints } from '@mui/system';
const breakpoints: Breakpoints = createBreakpoints({});

export const noteTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Delicious Handrawn, cursive',
      fontWeight: 400,
      fontStyle: 'normal',
      [breakpoints.down('sm')]: {
        fontSize: 12
      },
      [breakpoints.up('sm')]: {
        fontSize: 18
      },
      [breakpoints.up('md')]: {
        fontSize: 28
      },
      [breakpoints.up('lg')]: {
        fontSize: 35
      }
    }
  }
});
