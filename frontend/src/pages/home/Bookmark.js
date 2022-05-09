import React from 'react'
import { Container, makeStyles,CircularProgress } from "@material-ui/core"
import { useState } from 'react';
import { useEffect } from 'react';
import Post from '../../Components/posts/Post'
import { getAllPosts } from '../../Redux/Actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { Grid } from '@mui/material';
import { HomeContext } from '../../Context/HomeContext';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
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
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const userId = auth.user.id
    const { post, posts, loading } = useSelector((state) => state.posts);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menu = Boolean(anchorEl);
    const [openNote, setOpenNote] = useState(false);
    const bookmarkedPosts = posts.filter(post => post.bookmarks == userId)
    console.log(bookmarkedPosts)
    const ClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const CloseMenu = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(getAllPosts())
      })
   


    const renderPosts = bookmarkedPosts.map((post, index) => (
      <div >
        <Post
            post ={post}      
            show={show}
        />
    </div> 
     
    
    ))

    return (
      <HomeContext.Provider value={{openNote, setOpenNote}}>
        <Home>      
        <Container className={classes.container}>
        {loading ? 
                 
                 < CircularProgress size="3em" elevation={4} className={classes.loadingPaper} />
                :
                <>
                
           <Grid className={classes.mainContainer} container alignItems="stretch" spacing={2}> 
          
         {renderPosts}    
         </Grid>
         </>
         }
       
        
   
         </Container>
        </Home>
        </HomeContext.Provider>
    )
}

export default Bookmark