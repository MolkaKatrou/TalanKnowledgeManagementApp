import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from "../Redux/Actions/authActions";

export default function AdminHeader() {
  const dispatch = useDispatch()
  const LogoutHandler =() =>{
     dispatch(Logout())
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#221f4a"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  sx={{ mr:5}}>
          <Link aria-current="page" to="/admin" style={{ textDecoration: 'none', color:'white'}}>
            Admin Dashboard
            </Link>
          </Typography>
          <Typography variant="h6"  sx={{ flexGrow: 1 }}>
            <Link aria-current="page" to="/Home" style={{ textDecoration: 'none', color:'inherit'}}>
            Home
            </Link>
          </Typography>         
          <Button color="inherit" onClick={LogoutHandler}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}