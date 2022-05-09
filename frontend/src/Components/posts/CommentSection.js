import {
  TextField, Typography, Card, List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import React, { useState } from 'react'
import { Container, makeStyles } from "@material-ui/core"
import { Button } from '@mui/material';
import TextArea from "react-textarea-autosize";
import { useDispatch, useSelector } from 'react-redux';
import { commentPost } from '../../Redux/Actions/postsActions';
import { Box } from '@mui/system';
import { ListItemIcon } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',

  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  }
}));
function CommentSection({ post }) {
  const auth = useSelector(state => state.auth)
  const fullname = auth.user.firstname + ' ' + auth.user.lastname
  const dispatch = useDispatch()
  const classes = useStyles()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`,
    };
  }

  
  const handleClick = (e) => {
    e.preventDefault()
    //const finalComment = `${fullname} : ${comment}`
    const finalComment = {
      user: auth.user.firstname +' ' + auth.user.lastname,
      comment: comment
    }
    console.log(finalComment)
    const newComments = dispatch(commentPost(finalComment, post._id));
    setComment('');
    setComments(newComments);

  }


  return (

    <Typography>

      {/*<Typography gutterBottom variant="h6">Comments</Typography>
          {post.comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c.comment}
              
          </Typography>))}*/}

      <Typography>
        <span className='comments'>Comments</span>
        <span className="comments_count">{`(${post.comments.length})`}</span>


        <Box className='box my-5'>
          <TextArea
            className='textarea'
            placeholder="What are your thoughts?"
            minRows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}

          />
          <div className="panel">
            <div className="comment_as">
              Comment as{" "}
              <span className="username">
                {auth.user.firstname}
              </span>
            </div>
            <Typography className='mx-3'>
              <Button className='' disabled={!comment} variant='contained' onClick={handleClick}>
                Comment
              </Button>

            </Typography>
          </div>


        </Box>
      </Typography>

      {post.comments?.map((c, i) => (
        <Card key={i} className='mb-2' style={{ background: 'rgb(218, 218, 230)' }}>
          <ListItem key={i} alignItems="flex-start" gutterBottom variant="subtitle1">
            <ListItemAvatar>
              <Avatar 
               {...stringAvatar(c.user)}></Avatar>
              </ListItemAvatar>
            <ListItemText
                primary={
                  <Typography className={classes.fonts}>
                    {c.user}
                  </Typography>
                  
                }
                secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {` ${c.comment}`}
                    </Typography>
    
               
                } />
                <ListItemIcon className='justify-content-end'>
                <DeleteIcon/>
              </ListItemIcon>
          </ListItem>
        </Card>))}
    </Typography>

  )
}

export default CommentSection