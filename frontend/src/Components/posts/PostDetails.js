import { Card, CardContent, CircularProgress, Container, Divider, makeStyles, IconButton, CardActions, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CommentSection from "./CommentSection";
import { getPost } from "../../Redux/Actions/postsActions";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Home from "../../pages/home/Home";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '250px'
  },
  container: {
    paddingTop: theme.spacing(10),
    height: '100%',
    backgroundColor: 'rgb(225, 228, 232)'
  },
  card: {
    maxWidth: 720,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '60px',
    background: 'transparent'

  },
}))
function PostDetails() {
  const classes = useStyles()
  const [show, setShow] = useState(false);
  const auth = useSelector(state => state.auth)
  const userId = auth.user.id
  const { post, posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getPost(id))
  }, [post])

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
        {loading ?

          <CircularProgress size="1em" elevation={2} className={classes.loadingPaper} />
          :
          
          <div className="main">
            <div className="main-container">
              <div className="main-top">
                <h2 className="main-question"> {post?.title} </h2>
              </div>
              <Typography variant='subtitle1' gutterBottom style={{ color: `${post?.category?.color}` }}>
                {post?.category?.name}
              </Typography>
              <div className="main-desc">
                <div className="info">
                  <p>
                    Written by
                    <span> {post?.createdby.fullname} </span>
                  </p>
                  <p>
                    Posted <span>{moment(post.createdAt).fromNow()}</span>
                  </p>
                </div>
              </div>
              <div className="all-questions">
                <div className="all-questions-left">
                </div>
                <div className="question-answer">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              </div>
     
            
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>

              </CardActions>
              <Divider component='ul' />
              <CardContent>
                <CommentSection post={post} />
              </CardContent>
            </div>
          </div>
        }
      </Container>
    </Home>
  );
}

export default PostDetails;