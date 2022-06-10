import React, { useEffect, useContext } from 'react';
import { makeStyles, Box, Card, CardHeader, CardContent, CardActions, Typography, IconButton } from "@material-ui/core"
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, BookmarkPost, deletePost, getAllPosts } from '../../Redux/Actions/postsActions';
import { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import moment from 'moment';
import { HomeContext } from '../../Context/HomeContext';
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react'
import { Confirm } from 'semantic-ui-react'
import ReactHtmlParser from "react-html-parser";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  category: {
    border: 0,
    borderRadius: 10,
    color: 'white',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },


  card: {
    maxWidth: 570,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer',
    marginBottom: '40px',
    background: 'rgb(234, 233, 240)'
  }

}));
export default function Post({ post}) {
  const { setOpenNote, setShowAlert, socket, currentId, setCurrentId, dispatch, liked, setLiked } = useContext(HomeContext)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const classes = useStyles()
  const [likes, setLikes] = useState(post?.likes);
  const [bookmarks, setBookmarks] = useState(post?.bookmarks);
  const auth = useSelector(state => state.auth)
  const userId = auth.user.id
  const hasLikedPost = post?.likes?.find((like) => like === userId);
  const hasBookmarkedPost = post?.bookmarks?.find((bookmark) => bookmark === userId);
  const location = useLocation()


  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      sender: auth.user,
      receiver: post.createdby,
      type,
      postId : post._id,
      post: 'post',
 
    });
  };

  useEffect(() => {
    setLikes(post?.likes)
    setBookmarks(post?.bookmarks)
  }, [post._id])

  const UpdatePost = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
    setOpenNote(true)
  }

  const DeletePost = () => {
    dispatch(deletePost(post?._id))
    setOpen(false)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 4000);
  }

  const Bookmarks = () => {
    if (bookmarks?.length > 0) {
      return bookmarks?.find((bookmark) => bookmark === userId)
        ? (
          <BookmarkIcon style={{ color: '#937474' }} />
        ) : (
          <BookmarkOutlinedIcon />
        );
    }

    return <BookmarkOutlinedIcon />
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((like) => like === userId)
        ? (
          <><FavoriteIcon style={{ color: '#DA3131' }} />&nbsp;<span style={{ fontSize: '16px' }}>{likes?.length > 2 ? `You and ${likes?.length - 1} others` : `${likes?.length} Like${likes?.length > 1 ? 's' : ''}`}</span></>
        ) : (
          <><FavoriteOutlinedIcon />&nbsp;<span style={{ fontSize: '16px' }}>{likes?.length} {likes?.length === 1 ? 'Like' : 'Likes'}</span></>
        );
    }

    return <><FavoriteOutlinedIcon />&nbsp;<span style={{ fontSize: '16px' }}>Like</span></>;
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
      setLiked(!liked)
    } else {
      setLikes([...post.likes, userId]);
      setLiked(!liked)
      handleNotification(1)
    }
    dispatch(getAllPosts())
  };

  const handleBookmark = async () => {
    dispatch(BookmarkPost(post._id));
    if (hasBookmarkedPost) {
      setBookmarks(post.bookmarks.filter((id) => id !== userId));
      setLiked(!liked)
    } else {
      setBookmarks([...post.bookmarks, userId]);
      setLiked(!liked)
      handleNotification(2)
    }
    dispatch(getAllPosts())

  };



  return (
    <ChakraProvider>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <ChakraProvider>
              <Avatar name={post?.createdby?.fullname} src={post?.createdby?.pic} />

            </ChakraProvider>

          }
          action={
            <>

              {
                auth.user.email === post?.createdby.email ? (
                  <Menu isLazy>
                    <MenuButton><MoreVertIcon /></MenuButton>
                    <MenuList>
                      <MenuItem icon={<DeleteIcon style={{ marginRight: '30px', color: 'gray' }} />}
                        onClick={() => { setOpen(true) }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem icon={<EditIcon style={{ marginRight: '30px', color: 'gray' }} />}
                        onClick={UpdatePost}
                      >
                        Edit
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : ('')
              }
              <Confirm
                confirmButton="Delete"
                content='Are you sure you want to delete this post? '
                open={open}
                onCancel={() => { setOpen(false) }}
                onConfirm={DeletePost}
                style={{ height: '22%' }}
              />
            </>

          }
          title={
          <div className='row'>
            <div className='col-4'> {post?.createdby.fullname} </div>
            
              <Typography className='col-7' onClick={() => navigate(`/category/${post?.category._id}/notes`)} style={{ color: `${post.category.color}`, textAlign: 'center', fontWeight: '600', display: location.pathname === '/Home' || location.pathname ==='/Bookmarks' ? "flex" : "none" }}>
                {`  ${post?.category.name} `}

              </Typography> 
              
          </div>
          }
          subheader={moment(post?.createdAt).fromNow()}
        >
        </CardHeader>
        <CardContent onClick={() => navigate(`/post/${post._id}`)} >

          <Typography color="text.secondary" style={{ fontWeight: '550', fontFamily: 'Raleway,sans-serif', fontSize: '16px' }}>
            {post.title}
          </Typography>
          <div className='card-content mt-3'>{ReactHtmlParser(post?.content)}</div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} className="MyCustomButton">
            <Likes />
          </IconButton>
          <IconButton onClick={() => navigate(`/post/${post?._id}`)} className="MyCustomButton" >
            <CommentIcon fontSize="small" />&nbsp;
            <span style={{ fontSize: '16px' }}>{post?.comments?.length} Comments</span>
          </IconButton>
          <IconButton onClick={handleBookmark} className="MyCustomButton">
            <Bookmarks />
          </IconButton>

        </CardActions>


      </Card>
    </ChakraProvider>
  );
}