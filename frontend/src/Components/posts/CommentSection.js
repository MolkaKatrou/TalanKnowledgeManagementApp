import React, { useContext, useState } from 'react'
import {makeStyles, Typography, Divider} from '@material-ui/core';
import TextArea from "react-textarea-autosize";
import { useDispatch, useSelector } from 'react-redux';
import { commentPost } from '../../Redux/Actions/postsActions';
import { Box } from '@mui/system';
import { Avatar, Button, ChakraProvider } from '@chakra-ui/react';
import { Comment } from 'semantic-ui-react'
import moment from 'moment';
import { HomeContext } from '../../Context/HomeContext';

function CommentSection({ post }) {
  const {socket} = useContext(HomeContext)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')

  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      sender: auth.user,
      receiver: post.createdby,
      postId : post._id,
      post:'post',
      type,    
    });
  };
  
  const handleClick = (e) => {
    e.preventDefault()
    const finalComment = {
      user: auth.user.id,
      comment: comment
    }
    console.log(finalComment)
    const newComments = dispatch(commentPost(finalComment, post._id));
    handleNotification(3)
    setComment('');
    setComments(newComments);

  }


  return (
    <>
      <Typography>
        <span className='posts_comments'>Comments</span>
        <span className="comments_count">{`(${post?.comments?.length})`}</span>
        <Box className='box my-4'>
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
              <ChakraProvider className='mx-3'>
                <Button disabled={!comment} onClick={handleClick} colorScheme='blue' variant='solid'>
                  Comment
                </Button>
              </ChakraProvider>
  
          </div>
        </Box>
      </Typography>
      {post.comments?.map((c, i) => (
        <Comment.Group >   
        <Comment > 
          <ChakraProvider>
          <Avatar name={c?.user.fullname} src={c?.user.pic} style={{width:35, height:35}} size='sm'  mr={5} />
          </ChakraProvider>
          
          <Comment.Content style={{marginTop:'-35px'}} className='mx-5'>
          <Comment.Metadata  className='mx-2'>
            <Comment.Author as='a'>{c.user.fullname}</Comment.Author>
           
              <div>{moment(c.createdAt).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text className='mx-2'>
              <p> {` ${c.comment}`}</p>
            </Comment.Text>      
          </Comment.Content>        
        </Comment>      
        <Divider className='my-1' />  
      </Comment.Group> ))}


    </>

  )
}

export default CommentSection

 