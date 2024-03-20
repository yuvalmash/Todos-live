import { Breakpoints, createTheme } from '@mui/material';
import { createBreakpoints } from '@mui/system';
const breakpoints: Breakpoints = createBreakpoints({});

const subHeaderTextSize = {
  [breakpoints.down('sm')]: {
    fontSize: 8
  },
  [breakpoints.up('sm')]: {
    fontSize: 12
  },
  [breakpoints.up('md')]: {
    fontSize: 18
  },
  [breakpoints.up('lg')]: {
    fontSize: 25
  }
};

export const subHeaderTheme = createTheme({
  typography: {
    allVariants: {
      ...subHeaderTextSize
    }
  },
  components: {
    MuiButton: {
      ...subHeaderTextSize
    }
  }
});
