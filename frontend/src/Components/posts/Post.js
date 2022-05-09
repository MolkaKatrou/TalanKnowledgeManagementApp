import * as React from 'react';
import { makeStyles, Box, Card, CardHeader, Avatar, CardContent, CardActions, Typography, IconButton } from "@material-ui/core"
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, BookmarkPost, deletePost } from '../../Redux/Actions/postsActions';
import { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import moment from 'moment';
import { useContext } from 'react';
import { HomeContext } from '../../Context/HomeContext';
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react'
import { Confirm } from 'semantic-ui-react'


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
    maxWidth: 550,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer',
    marginBottom: '60px',
    background: 'rgb(234, 233, 240)'
  }

}));
export default function Post({ post, show }) {
  const { setOpenNote, setShowAlert, currentId, setCurrentId } = useContext(HomeContext)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [likes, setLikes] = useState(post.likes);
  const [bookmarks, setBookmarks] = useState(post.bookmarks);
  const auth = useSelector(state => state.auth)
  const userId = auth.user.id
  const hasLikedPost = post.likes.find((like) => like === userId);
  const hasBookmarkedPost = post.bookmarks.find((bookmark) => bookmark === userId);

  const UpdatePost = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
    console.log(currentId)
    setOpenNote(true)
  }

  const DeletePost = () => {
    dispatch(deletePost(post._id))
    setOpen(false)
    setTimeout(() => {
      setShowAlert(true)
  }, 1000);
    setTimeout(() => {
      setShowAlert(false)
  }, 4000);
  }

  const Bookmarks = () => {
    if (bookmarks.length > 0) {
      return bookmarks.find((bookmark) => bookmark === userId)
        ? (
          <BookmarkIcon />
        ) : (
          <BookmarkOutlinedIcon />
        );
    }

    return <BookmarkOutlinedIcon />
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><FavoriteIcon />&nbsp;<span style={{ fontSize: '16px' }}>{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</span></>
        ) : (
          <><FavoriteOutlinedIcon />&nbsp;<span style={{ fontSize: '16px' }}>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</span></>
        );
    }

    return <><FavoriteOutlinedIcon />&nbsp;<span style={{ fontSize: '16px' }}>Like</span></>;
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
    console.log(likes)
  };

  const handleBookmark = async () => {
    dispatch(BookmarkPost(post._id));
    if (hasBookmarkedPost) {
      setBookmarks(post.bookmarks.filter((id) => id !== userId));
    } else {
      setBookmarks([...post.bookmarks, userId]);
    }
  };



  return (
    <ChakraProvider>
      <Box>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar style={{ background: red[500] }}>

              </Avatar>
            }
            action={
              <>

                <Menu>
                  <MenuButton><MoreVertIcon /></MenuButton>
                  <MenuList>
                    <MenuItem icon={<DeleteIcon style={{ marginRight: '30px', color: 'gray' }} />}
                      onClick={() => {setOpen(true)}}
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
                <Confirm
                  open={open}
                  onCancel={() => {setOpen(false)}}
                  onConfirm={DeletePost}
                  style={{height:'20%'}}
                />
                {/*<IconButton aria-label="settings">

                
                  aria-haspopup="true"
                  onClick={ClickMenu} />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={menu}
                onClose={CloseMenu}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',

                  },
                }}
              >
                <MenuItem onClick={() => dispatch(deletePost(post._id))}
                
                > <DeleteIcon style={{ marginRight: '30px', color: 'gray' }} />Delete</MenuItem>
                <MenuItem onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                  setOpenNote(true)
                  setAnchorEl(null);
                }} ><EditIcon style={{ marginRight: '30px', color: 'gray' }} /> Update</MenuItem>

              </Menu>*/}
              </>

            }
            title={post.createdby.firstname + ' ' + post.createdby.lastname.toUpperCase()}
            subheader={moment(post.date).fromNow()}
          >
          </CardHeader>

          <CardContent >
            <Typography>
              <Typography className={classes.category} style={{ color: `${post.category.color}`, boxShadow: `0 1px 1px 1px ${post.category.color}`, display: show ? "flex" : "none" }}>
                {post.category.name}
              </Typography>
              <Typography noWrap='true' color="text.secondary" style={{ marginTop: show ? "20px" : "0px", fontWeight: '550', fontFamily: 'Raleway,sans-serif', fontSize: '16px' }}>
                {post.title}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginTop: '20px' }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={handleLike}>
              <Likes />
            </IconButton>
            <IconButton onClick={() => navigate(`/post/${post._id}`)} >
              <CommentIcon fontSize="small" />&nbsp;
              <span style={{ fontSize: '16px' }}>{post.comments.length} Comments</span>
            </IconButton>
            <IconButton onClick={handleBookmark} >
              <Bookmarks />
            </IconButton>

          </CardActions>


        </Card>
      </Box>
    </ChakraProvider>
  );
}