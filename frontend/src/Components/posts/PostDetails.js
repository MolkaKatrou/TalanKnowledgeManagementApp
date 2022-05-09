import React, { useEffect } from 'react'
import { Container, makeStyles, Paper,Card, Avatar,IconButton, CardMedia, CardActions, CardContent , CardHeader, Typography, CircularProgress, Divider } from "@material-ui/core"
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Home from '../../pages/home/Home'
import { getPost } from "../../Redux/Actions/postsActions";
import CommentSection from "./CommentSection";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(10),
      height: '100%',
      backgroundColor: 'rgb(225, 228, 232)'
    },

    card:{
      maxWidth: 720, 
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom:'60px', 
      background:'rgb(234, 233, 240)'

    },

      loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:'250px'   
      },
  }));
  

export default function PostDetails() {
    const classes= useStyles()
    const { post, posts, loading } = useSelector((state) => state.posts);
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
   
    useEffect(()=>{
        dispatch(getPost(id))
    },[post])

    if (!post) {
        return (          
          <Home>
            <Container className={classes.container}>
            <CircularProgress size="3em" elevation={2} className={classes.loadingPaper} />
            </Container>
          </Home>
          
        )
    }

  return (
      <Home>
         <Container className={classes.container}>
         { loading ?         
                 < CircularProgress size="1em" elevation={2} className={classes.loadingPaper} />
                :
             
                <Card className={classes.card}>
              
                    <CardHeader                    
                      avatar={
                        <Avatar style={{background: red[500]}}>                       
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={post.createdby.firstname + ' ' + post.createdby.lastname.toUpperCase()}
                      subheader={moment(post.date).fromNow()}
                    />
              
                    <CardContent >
                        <Typography variant='h6' gutterBottom  style={{ color: `${post.category.color}`}}>
                         {post.category.name}
                        </Typography>
                        </CardContent>
                        <Divider component='ul' className='mt-1'/>
                        <CardContent>
                        <Typography mt={4} color="text.secondary" style={{fontWeight:'520', fontFamily: 'Raleway,sans-serif', fontSize:'16px', marginTop:'20px' ,marginBottom:'20px'}}>
                          {post.title}
                      </Typography>
                      
                      <Typography mt={4} variant="body2" color="text.secondary" >
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                    <Divider component='ul'/>
                    <CardContent>
                    <CommentSection post={post}/>
                    </CardContent>
                  </Card>
  }
    </Container>
    </Home>
  
  )
}
