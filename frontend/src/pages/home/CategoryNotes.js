import React, { useEffect, useState, useContext} from "react";
import Home from './Home'
import Post from '../../Components/posts/Post'
import { Container, makeStyles, CircularProgress, Grid } from "@material-ui/core"
import CategoryBanner from "../../Components/CategoryBanner";
import {useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import { getAllPosts } from '../../Redux/Actions/postsActions';
import { HomeContext } from '../../Context/HomeContext';
import Alert from '@mui/material/Alert';
import { createCategoryList } from "../../utils/functions";
import { Button } from "semantic-ui-react";
import FilterListIcon from "@material-ui/icons/FilterList";



const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100%',
    backgroundColor: 'rgb(225, 228, 232)'
  },

  card: {
    paddingBottom: theme.spacing(4),
  },

  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '250px'
  },
}));


export default function CategoryNotes() {
  const { id } = useParams();
  const classes = useStyles()
  const postsList = useSelector(state => state.posts)
  const categoriesList = useSelector(state => state.categories)
  const filteredCategories = createCategoryList(categoriesList.categories).filter(cat => cat.value == id)
  const categoryPosts = postsList.posts
  const filteredPosts = categoryPosts.filter(post => post.category._id == id)
  const [show, setShow] = useState(false)
  const [latest, setLatest] = useState(true)

  const {showAlert, openNote, dispatch, liked} = useContext(HomeContext)


  useEffect(() => {
    dispatch(getAllPosts())
  },[dispatch, openNote, liked])


  const renderLatestPosts = filteredPosts.reverse().map((post, index) => {
    return <div >
      <Post
        post={post}
        show={show}
      />
    </div>
  }
  )

  const renderTrendingPosts = filteredPosts.sort(function (one, other) {
    return other.likes.length - one.likes.length;
 }).map((post, index) => (
    <Grid key={post._id}>
      <Post
          post = {post}      
          show={show}      
      /> 
     </Grid>
    )
  )

  return (
    <Home>
      <Container className={classes.container}>
      { showAlert ? <Alert style={{marginBottom:'15px'}} variant="filled" severity="success">The post has been successfully deleted!</Alert> : ""}
        {postsList.loading ?
          < CircularProgress size="3em" elevation={4} className={classes.loadingPaper} />
          :

          filteredCategories.map((category, index) => (
            <Grid key={category._id}>
            <CategoryBanner category={category}/>
            </Grid>
          ))}
       

        <div className="main">
          <div className="main-container">
            <div className="main-top">
              <h2>All Notes</h2>


            </div>
            <div className="main-desc">
              <p>{`${filteredPosts.length} Note${filteredPosts.length > 1 ? 's' : ''}`}</p>
           
                <div className="main-tabs">
                  <Button.Group>
                    <Button onClick={()=> setLatest(true)}>Latest</Button>
                    <Button onClick={()=> setLatest(false)}>Trending</Button>
                  </Button.Group>
                </div>
                <div className="main-filter-item">
                  <FilterListIcon />
                  <p>Filter</p>
             
              </div>
            </div>
            <div className="questions">

              <div className="question">
              { latest ? renderLatestPosts : renderTrendingPosts}
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Home>
  )
}
