import React, { useContext, useEffect, useState } from 'react'
import logo from '../images/logo.png'
import { alpha, AppBar, Badge, Box, InputBase, makeStyles, Typography, IconButton } from "@material-ui/core"
import { Toolbar } from '@mui/material';
import Search from '@mui/icons-material/Search';
import Mail from '@mui/icons-material/Mail';
import Notifications from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpen from '@mui/icons-material/LockOpen';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { ChangePasswordAction, Logout } from "../Redux/Actions/authActions";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, MenuButton, MenuList, Button, MenuItem, ChakraProvider, Divider, Avatar, AvatarBadge, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { HomeContext } from '../Context/HomeContext';
import { getSender } from '../Components/Chats/ChatLogic';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import Passwordinput from '../Components/inputs/Password';


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
  const [form, setForm] = useState({});
  const errors = useSelector(state => state.errors)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setSocketConnected, notification, socket, notifications, setNotifications, setNotification, selectedChat, setSelectedChat, notificationChat, setNotificationChat } = useContext(HomeContext)
  const auth = useSelector(state => state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const ChangepasswordHandler = () => {
    dispatch(ChangePasswordAction(form))
  }

  const LogoutHandler = () => {
    dispatch(Logout())
  }
  const classes = useStyles()


  const displayNotification = ({ sender, type }) => {
    let action;

    if (type === 1) {
      action = "liked your post.";
    } else if (type === 2) {
      action = "bookmarked your post";
    } else if (type === 3) {
      action = "commented on your post";
    }
    else if (type === 4) {
      action = "upvoted your question";

    } else if (type === 5) {
      action = "downvoted your question";
    }
    else if (type === 6) {
      action = "commented on your question";
    }
    else if (type === 7) {
      action = "upvoted your answer";
    }
    else if (type === 8) {
      action = "downvoted your answer";
    }
    else {
      action = "answered your question"
    }
    return (
      <span className="d-flex" style={{ color: 'black' }}>
        <ChakraProvider>
          <Avatar size='sm' p={0} name={sender.fullname} src={sender.pic} />
        </ChakraProvider>
        <div className='mt-1 mx-2'> {`${sender.fullname} ${action}`}</div>
      </span>
    );
  };


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
                  count={notificationChat ? notification.length : 0}
                  effect={Effect.SCALE}
                  style={{ width: '10px', height: '18px', paddingLeft: '4px', paddingRight: '10px' }}
                />
                <Mail />
              </MenuButton>
            </Menu>
            <Menu >
              <MenuButton className={classes.message} mx={10}>
                <NotificationBadge
                  count={notifications.length}
                  effect={Effect.SCALE}
                  style={{ width: '10px', height: '18px', paddingLeft: '4px', paddingRight: '10px' }}
                />
                <Notifications />
              </MenuButton>
              <MenuList pl={2}>
                {notifications.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      if (notif.post === 'post') {
                        navigate(`/post/${notif.postId}`)
                      }
                      else if (notif.post === 'question') {
                        navigate(`/Main-Question/${notif.postId}`)
                      }
                      setNotifications(notifications.filter((n) => n !== notif));

                    }}
                  >
                    {displayNotification(notif)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </ChakraProvider>
          <Box sx={{ flexGrow: 0 }}>
            <ChakraProvider>
              <Menu>
                <MenuButton> <Avatar p={0} name={auth.user.fullname} src={auth.user.pic} /></MenuButton>
                <MenuList className='text-secondary' >
                  <Box className="d-flex">
                    <Avatar name={auth.user.fullname} src={auth.user.pic} className='mx-3' >  <AvatarBadge bg='green.500' boxSize='1em' /></Avatar>
                    <div>
                      <h1 style={{ fontFamily: 'PT sans', fontSize: '15px' }} className='mt-2 text-secondary'>{auth.user.fullname}</h1>
                      <h6 style={{ fontFamily: 'Segoe UI', fontSize: '10px', color: 'gray', marginTop: '2px' }}>{auth.user.email}</h6>
                    </div>
                  </Box>
                  <Divider className='mt-3 mb-3' />

                  <MenuItem icon={<AccountCircle />} onClick={() => { navigate(`/Profile/${auth.user.id}`) }}>
                    Profile
                  </MenuItem>

                  <MenuItem icon={<LockOpen />} onClick={onOpen} >
                    Manage Account
                  </MenuItem>
                  <Modal size='full' isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent style={{ width: '60%' }}>
                      <ModalHeader>Change Password</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>

                        <div className='mx-5 mt-5'>
                          <FormControl>
                            <FormLabel>Old Password</FormLabel>
                            < Passwordinput
                              name="old_password"
                              placeholder="Enter your old password"
                              icon="fa fa-key"
                              onChangeHandler={onChangeHandler}
                              errors={errors.old_password}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>New Password</FormLabel>
                            <Passwordinput
                              name="new_password"
                              placeholder="Enter your new password"
                              icon="fa fa-key"
                              onChangeHandler={onChangeHandler}
                              errors={errors.new_password}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Confirm New Password</FormLabel>
                            < Passwordinput
                              name="confirm_password"
                              placeholder="Confirm your new password"
                              icon="fa fa-key"
                              onChangeHandler={onChangeHandler}
                              errors={errors.confirm_password}
                            />
                          </FormControl>
                        </div>


                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={ChangepasswordHandler}>
                          Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
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

