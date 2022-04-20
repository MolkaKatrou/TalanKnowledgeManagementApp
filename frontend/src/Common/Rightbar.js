import React from 'react'
import {Container, makeStyles} from "@material-ui/core"
const useStyles = makeStyles((theme)=>({
  container:{
    paddingTop:theme.spacing(10),
    height: "100vh",  
    color: "#555",
    border: "1px solid #aaa",
  
  }
}));

const Rightbar = () => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
       
    </Container>
  )
}

export default Rightbar