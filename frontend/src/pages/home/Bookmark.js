import React, { useContext } from 'react'
import { Container, makeStyles,CircularProgress } from "@material-ui/core"
import { useState } from 'react';
import { useEffect } from 'react';
import Post from '../../Components/posts/Post'
import { getAll, getAllPosts } from '../../Redux/Actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { Grid } from '@mui/material';
import { HomeContext } from '../../Context/HomeContext';
import Question from '../../Components/Questions&Answers/Question';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(8),
        height:'100%',
        backgroundColor:'rgb(225, 228, 232)'
    },
    mainContainer: {
        borderRadius: 15,
        paddingTop: theme.spacing(5),
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
      },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:'250px'
      },
}));

function Bookmark() {
    const show=true
    const classes = useStyles()
    const auth = useSelector(state => state.auth)
    const userId = auth.user.id
    const {posts} = useSelector((state) => state.posts);
    const {questions} = useSelector((state) => state.questions);
    const bookmarkedQuestions = questions.filter(question => question?.bookmarks?.includes(userId))
    const bookmarkedPosts = posts.filter(post => post?.bookmarks?.includes(userId) && post.isDraft===false)
    const {postsQuestions, loading} = useSelector(state => state.all)
    const bookmarkedPostsQuestions = postsQuestions.filter(post => post?.bookmarks?.includes(userId))
    console.log(bookmarkedPostsQuestions)
    const {showAlert, openNote, setOpenNote, dispatch, liked} = useContext(HomeContext)

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAll())
      },[dispatch, openNote, liked, showAlert])
   

    const renderPosts = bookmarkedPostsQuestions.reverse().map((post, index) => (
      <div >
        { post.content ? 
        <Post
            post ={post}      
      
        />
        : 
        <Question
          question={post}
        />
}
    </div> 
     
    
    ))

    return (
        <Home>      
        <Container className={classes.container}>
        {loading ? 
                 
                 < CircularProgress size="3em" elevation={4} className={classes.loadingPaper} />
                :
                <>
                
           <Grid className={classes.mainContainer} container  spacing={3}> 
          
        
         {bookmarkedPostsQuestions.length>0 ? renderPosts : <div className={classes.loadingPaper} style={{color:'gray'}}>No Bookmarks</div>}
         </Grid>
         </>
         }
       
        
   
         </Container>
        </Home>
    )
}

export default Bookmark