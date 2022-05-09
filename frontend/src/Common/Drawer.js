import * as React from 'react';
import { alpha, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel,  ListSubheader, makeStyles, Menu, MenuItem, Modal, Select, TextField, Typography } from "@material-ui/core"
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;
const ITEM_HEIGHT = 48;


const useStyles = makeStyles((theme) => ({

    drawer:{
        [theme.breakpoints.down("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          },
    },
    
    container: {
        height: "100%",
        width:'100%',
        background: 'rgb(225, 228, 232)',
        boxShadow: '0 5px 2px #8084ac',
        top: 0,
        [theme.breakpoints.up("sm")]: {
          border: "1px solid #8084ac",
        },
      },

  item: {
    display: "flex",
    alignItems: "center",
    color: 'black',
    cursor: "pointer",
    '&:hover': {
      backgroundColor: 'rgb(191, 205, 222)',
  },       
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },

  list: {
    color: 'black',
    marginTop: '-10px',
    marginLeft: '-5px',
    fontFamily: 'Monaco',
    fontWeight: '540',
    float: 'left',
    margin: '10px 10px 0 0'
  },

  icon: {
    color: '#8084ac',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "21px",
    },
  },
  text: {
    fontFamily: 'Monaco',
    fontWeight: '540',
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  },

  checkbox: {
    display: "none",
    color: 'red'
  },
}));




export default function ClippedDrawer() {
    const classes=useStyles()
  return (

      <Drawer
        variant="permanent"
        className={classes.drawer}
      >
        <Toolbar/>
        <Box sx={{ overflow: 'auto' }}
        className={classes.container}
        
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text} className={classes.item}>
                <ListItemIcon className={classes.icon}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText className={classes.text} primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List  >
            {['All mail', 'Trash', 'Spam','fjfj','fsejfsz','fskjfsk','fkfk','fsklfjesz,'].map((text, index) => (
              <ListItem button key={text} className={classes.item}>
                <ListItemIcon className={classes.icon}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} className={classes.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>


  );
}