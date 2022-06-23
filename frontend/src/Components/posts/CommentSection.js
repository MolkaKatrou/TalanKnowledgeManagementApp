import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, Typography, Divider } from '@material-ui/core';
import TextArea from "react-textarea-autosize";
import { useDispatch, useSelector } from 'react-redux';
import { commentPost, deleteComment, getAllPosts } from '../../Redux/Actions/postsActions';
import { Box } from '@mui/system';
import { Avatar, Button, ChakraProvider } from '@chakra-ui/react';
import { Comment, Confirm } from 'semantic-ui-react'
import moment from 'moment';
import { HomeContext } from '../../Context/HomeContext';
import toast from 'react-hot-toast';

function CommentSection({ post }) {
  const { t, socket, showAlert, setShowAlert } = useContext(HomeContext)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts())
  }, [comment])


  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      sender: auth.user,
      receiver: post.createdby,
      postId: post._id,
      post: 'post',
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
    setLoading(true)
    handleNotification(3)
    setComment('');
    setComments(newComments);
    setTimeout(() => {
      setLoading(false);    
    }, 2000);

  }

  const DeleteComment = (_id) => {
    dispatch(deleteComment(_id))
    toast.success("The comment is successfully deleted!")
    setShowAlert(!showAlert)
    setOpen(false)
  }


  return (
    <>
      <Typography>
        <span className='posts_comments'>{t('Comments')}</span>
        <span className="comments_count">{`(${post?.comments?.length})`}</span>
      </Typography>
      {post.comments?.map((c, i) => (
        <Comment.Group >
          <Comment >
            <ChakraProvider>
              <Avatar name={c?.user.fullname} src={c?.user.pic} style={{ width: 35, height: 35 }} size='sm' mr={5} />
            </ChakraProvider>
            <Comment.Content style={{ marginTop: '-35px' }} className='mx-5'>
              <Comment.Metadata className='mx-2'>
                <Comment.Author as='a'>{c.user.fullname}</Comment.Author>
                <div>{moment(c.createdAt).fromNow()}</div>
                {auth.user.id === c.user._id ? <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { setOpen(true) }} >delete</div> : ''}
                <Confirm
                  confirmButton={t("Delete Comment")}
                  cancelButton={t('Cancel')}
                  content={t('Are you sure you want to delete this comment?')}
                  open={open}
                  onCancel={() => { setOpen(false) }}
                  onConfirm={() => { DeleteComment(c._id) }}
                  style={{ height: '22%' }}
                />
              </Comment.Metadata>
              <Comment.Text className='mx-2'>
                <p> {` ${c.comment}`}</p>
              </Comment.Text>
            </Comment.Content>
          </Comment>
          <Divider className='my-1' />
        </Comment.Group>))}

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
            {t('Comment as')} {" "}
            <span className="username">
              {auth.user.firstname}
            </span>
          </div>
          <ChakraProvider className='mx-3'>
            <Button disabled={!comment} onClick={handleClick} colorScheme='blue' variant='solid' isLoading={loading}>
              {t('Comment')}
            </Button>
          </ChakraProvider>

        </div>
      </Box>


    </>

  )
}

export default CommentSection

