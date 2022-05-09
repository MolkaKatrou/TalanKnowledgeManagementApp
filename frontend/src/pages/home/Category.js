import React, { useEffect, useState } from "react";
import Home from './Home'
import Post from '../../Components/posts/Post'
import { Container, makeStyles, CircularProgress, Typography,Box } from "@material-ui/core"
import CategoryBanner from "../../Components/CategoryBanner";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllPosts } from '../../Redux/Actions/postsActions';
import { useTheme } from '@mui/material/styles';
import { HomeContext } from '../../Context/HomeContext';


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


export default function Category() {
  const theme = useTheme();
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        color: category.color,
        followers: category.followers
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options;
  }





  const { id } = useParams();
  const dispatch = useDispatch()
  const classes = useStyles()
  const postsList = useSelector(state => state.posts)
  const categoriesList = useSelector(state => state.categories)
  const cat = createCategoryList(categoriesList.categories)
  const filteredCategories = createCategoryList(categoriesList.categories).filter(cat => cat.value == id)
  const categoryPosts = postsList.posts
  const filteredPosts = categoryPosts.filter(cat => cat.category._id == id)
  const [show, setShow] = useState(false)
  const [openNote, setOpenNote] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts())
  })


  const renderPosts = filteredPosts.reverse().map((post, index) => {
    return <div >
      <Post
        post={post}
        show={show}
        creator={post.createdby.firstname + ' ' + post.createdby.lastname.toUpperCase()}
      />
    </div>
  }
  )

  return (
    <HomeContext.Provider value={{openNote, setOpenNote}}>
    <Home>
      <Container className={classes.container}>
        {postsList.loading ?
          < CircularProgress size="3em" elevation={4} className={classes.loadingPaper} />
          :

          filteredCategories.map((category, index) => (
            <CategoryBanner category={category}/>
          ))}
        {renderPosts}

      </Container>
    </Home>
    </HomeContext.Provider>
  )
}
