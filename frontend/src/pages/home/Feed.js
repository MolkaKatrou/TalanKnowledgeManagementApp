import React, { useState, useEffect } from 'react'
import { Container, makeStyles,CircularProgress } from "@material-ui/core"
import Post from '../../Components/posts/Post'
import { getAllPosts, getPostsBySearch } from '../../Redux/Actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './Home';
import { HomeContext } from '../../Context/HomeContext';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        height:'100%',
        backgroundColor:'rgb(225, 228, 232)'
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:'250px'
      },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function Feed() {
    const show=true
    const classes = useStyles()
    const dispatch = useDispatch()
    const postsList = useSelector(state => state.posts)
    const {loading, create } = useSelector((state) => state.posts);
    const [currentId, setCurrentId] = useState(0);
    const [openNote, setOpenNote] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [search, setSearch] = useState('');
    const [content, setContent] = useState("");
    const auth = useSelector(state => state.auth)
    const userId = auth.user.id
    const posts = postsList.posts
    const FollowedPosts = posts.filter(post => post.category.followers == userId)
  
    const navigate=useNavigate()
    const query = useQuery();



    useEffect(() => {
        dispatch(getAllPosts())
      }) 

      const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };
    
      const searchPost = () => {
        if (search.trim()) {
          dispatch(getPostsBySearch({search}));
          navigate(`/Home/search?searchQuery=${search || 'none'}`);
        }
        else {
          navigate('/Home');
        }
      };

    const renderPosts = FollowedPosts.reverse().map((post, index) => (
        <Post
            post = {post}      
            show={show}
        /> 
      )
    )


    return (
      <HomeContext.Provider value={{openNote, setOpenNote, showAlert, setShowAlert, currentId, setCurrentId, content, setContent}}>
        <Home 
          handleKeyPress={handleKeyPress} 
          searchPost={searchPost}
          search={search}
          setSearch={(e) => setSearch(e.target.value)}
        >
        <Container className={classes.container}>
        { showAlert ? <Alert style={{marginBottom:'15px'}} variant="filled" severity="success">The post has been successfully deleted!</Alert> : ""}

        { postsList.loading? 
                 
                 < CircularProgress size="3em" elevation={4} className={classes.loadingPaper} />
                :
         renderPosts
         }
        </Container>
        </Home>
      </HomeContext.Provider>
    )
}

export default Feed