import React from 'react'
import { Grid, makeStyles } from "@material-ui/core"
import HomeNavbar from '../../Common/homeNavbar';
import Sidebar from '../../Common/Sidebar';
import Feed from './Feed';
import AddNote from './AddNote';
import Rightbar from '../../Common/Rightbar';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({}));

const Home = () => {
  const auth = useSelector(state => state.auth)
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role
  }
  const classes = useStyles()
  return (
    <div>
      <HomeNavbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Sidebar user={user} />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed />
        </Grid>
        <Grid item sm={3} className="d-none d-sm-block">
          <Rightbar/>
        </Grid>
      </Grid>
      <AddNote/>
    </div>
  )
}

export default Home