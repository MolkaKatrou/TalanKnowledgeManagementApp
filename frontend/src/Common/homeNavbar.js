import React, { useContext, useState } from 'react'
import logo from '../images/logo.png'
import { alpha, AppBar, Button, Badge, Box, InputBase, makeStyles, Typography, IconButton } from "@material-ui/core"
import { Toolbar } from '@mui/material';
import Search from '@mui/icons-material/Search';
import Mail from '@mui/icons-material/Mail';
import Notifications from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpen from '@mui/icons-material/LockOpen';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { Logout } from "../Redux/Actions/authActions";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, ChakraProvider, Divider, Avatar, AvatarBadge } from "@chakra-ui/react";
import { HomeContext } from '../Context/HomeContext';
import { getSender } from '../Components/Chats/ChatLogic';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";


const useStyles = makeStyles((theme) => ({
  message: {
    cursor: 'pointer',
    "&:hover": {
      color: "#565CAA"
    }
  },
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export default function HomeNavbar({ searchPost, handleKeyPress, search, setSearch }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { notification, setNotification,selectedChat, setSelectedChat, notificationChat, setNotificationChat } = useContext(HomeContext)
  const auth = useSelector(state => state.auth)


  const LogoutHandler = () => {
    dispatch(Logout())
  }
  const classes = useStyles()


  return (
    <AppBar position='fixed' >
      <Toolbar className="d-flex justify-content-between" style={{ backgroundColor: '#8084ac' }}>
        <Typography variant="h6" onClick={() => { navigate('/Home') }}>
          <img style={{ cursor: 'pointer', marginRight: '200px', width: "90px" }} src={logo} alt='logo' />
        </Typography>
        <div className={classes.search}>
          <Search className='mx-3' onClick={searchPost} />
          <InputBase
            onKeyDown={handleKeyPress}
            placeholder='Search'
            className='me-2'
            name="search"
            variant="outlined"
            fullWidth
            value={search}
            onChange={setSearch}
          />
        </div>
        <div className="d-flex align-items-center">

          <ChakraProvider>
            <Menu >
              <MenuButton
                className={classes.message}
                mx={5}
                onClick={() => { 
                  navigate('/chats');
                  setNotificationChat(false)
                }}
              >
                <NotificationBadge
                  count={notificationChat? notification.length : 0 }
                  effect={Effect.SCALE}
                  style={{ width: '10px', height:'18px', paddingLeft:'4px', paddingRight:'10px' }}
                />
                <Mail />
              </MenuButton>
            </Menu>
            <Menu >
              <MenuButton className={classes.message} mx={10}><Notifications /></MenuButton>
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(auth.user, notif.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </ChakraProvider>
          <Box sx={{ flexGrow: 0 }}>
            <ChakraProvider>
              <Menu isLazy>
                <MenuButton> <Avatar p={0} name={auth.user.fullname} src={auth.user.pic} /></MenuButton>
                <MenuList className='text-secondary' >
                  <Box className="d-flex">
                    <Avatar name={auth.user.fullname} src={auth.user.pic}  className='mx-3' >  <AvatarBadge bg='green.500' boxSize='1em' /></Avatar>
                    <div>
                    <h1 style={{ fontFamily: 'PT sans', fontSize: '15px' }} className='mt-2 text-secondary'>{auth.user.fullname}</h1>
                    <h6 style={{ fontFamily: 'Segoe UI', fontSize: '10px' , color:'gray' , marginTop:'2px' }}>{auth.user.email}</h6>
                    </div>
                  </Box>
                  <Divider className='mt-3 mb-3' />

                  <MenuItem icon={<AccountCircle />} onClick={() => { navigate(`/Profile/${auth.user.id}`) }}>
                    Profile
                  </MenuItem>

                  <MenuItem icon={<LockOpen />} >
                    Change Password
                  </MenuItem>
                  <Divider className='mt-2 mb-2' />
                  <MenuItem icon={<LogoutIcon />} onClick={LogoutHandler} >
                    Logout
                  </MenuItem>

                </MenuList>
              </Menu>
            </ChakraProvider>

          </Box>
        </div>
      </Toolbar>
    </AppBar>
  )
}

