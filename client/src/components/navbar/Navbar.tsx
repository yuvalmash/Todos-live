import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>
          My Todo's
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
