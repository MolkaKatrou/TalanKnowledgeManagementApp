import React, { useState } from 'react'
import logo from '../images/logo.png'
import { alpha, AppBar, Avatar, Badge, Box, InputBase, makeStyles, Menu, MenuItem, Tooltip, Typography } from "@material-ui/core"
import { Divider, Toolbar } from '@mui/material';
import Search from '@mui/icons-material/Search';
import Mail from '@mui/icons-material/Mail';
import Notifications from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpen from '@mui/icons-material/LockOpen';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch } from 'react-redux';
import { Logout } from "../Redux/Actions/authActions";
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    alignItems: "center",
    marginLeft: '-150px',
    borderRadius: '20px',
    border: "1px solid #aaa7",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

    width: '50%',
  },

}));

export default function HomeNavbar() {
  const [userMenu, setUserMenu] = useState(null);
  const dispatch = useDispatch()
 
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`,
    };
  }
  
  
  const LogoutHandler =() =>{
     dispatch(Logout())
  }
  const handleOpenUserMenu = (e) => {
    setUserMenu(e.target);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };
  const classes = useStyles()
  const auth = useSelector(state => state.auth)

  return (
    <AppBar position='fixed'>
      <Toolbar className="d-flex justify-content-between" style={{ backgroundColor: '#8084ac' }}>
        <Typography variant="h6">
          <img style={{ marginRight: '200px', width: "90px" }} src={logo} alt='logo' />
        </Typography>
        <div className={classes.search}>
          <Search className='mx-3' />
          <InputBase placeholder='Search' className='me-2' />
        </div>
        <div className="d-flex align-items-center">

          <Badge className="mx-5">
            <Mail />
          </Badge>
          <Badge className="me-4">
            <Notifications />
          </Badge >
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='profile'>
              <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(auth.user.firstname +' ' + auth.user.lastname)} />
              </Button>
            </Tooltip>
            <Menu
              style={{ marginTop: '37px' }}
              id="menu-appbar"
              anchorEl={userMenu}
              open={Boolean(userMenu)}
              onClose={handleCloseUserMenu}
            >
              <Box className="d-flex">
                 <Avatar {...stringAvatar(auth.user.firstname +' ' + auth.user.lastname)} className='mx-3' />
                 <h6 className='mt-2 text-secondary'>{auth.user.firstname +' ' + auth.user.lastname.toUpperCase()}</h6>
              </Box>
              <Divider component="li" className='mt-3 mb-3'/>
              <MenuItem>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon> Profile
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <LockOpen />
                </ListItemIcon> Change password
              </MenuItem>
             <Divider component="li" className='mt-2 mb-2'/>
              <MenuItem onClick={LogoutHandler}>      
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon> Logout         
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  )
}

