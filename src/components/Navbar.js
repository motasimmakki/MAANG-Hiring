import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import maang from '../images/maang.png';

export default function Navbar() {
  return (
      <AppBar position="static" style={{ background: '#3e5175' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className='navbar-cont'>
        <img className='navbar-logo' src={maang} alt="logo"/>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HIRING
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
