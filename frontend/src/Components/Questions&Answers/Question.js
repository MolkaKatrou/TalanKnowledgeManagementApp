import React, { useState, useContext, useEffect } from "react";
import { makeStyles, Box, Card, CardContent, Typography, CardHeader, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { Col } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import { ChakraProvider } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Confirm } from 'semantic-ui-react'
import { deleteQuestion, DownVoteQuestion, getAllQuestions, UpVoteQuestion } from "../../Redux/Actions/questionsActions";
import { HomeContext } from "../../Context/HomeContext";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 660,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '40px',
    background: 'rgb(234, 233, 240)'
  }

}));

function Question({ question, show }) {
  const {  setShowAlert,showAlert } = useContext(HomeContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { answers } = useSelector((state) => state.answers);
  const AllAnswers = answers.filter(answer => answer.question._id == question._id)
  const auth = useSelector(state => state.auth)
  const userId = auth.user.id
  const hasUpvotedquestion = question.upVotes.find((vote) => vote === userId);
  const hasDownvotedquestion = question.downVotes.find((vote) => vote === userId);
  const [upVotes, setUpVotes] = useState(question.upVotes);
  const [downVotes, setDownVotes] = useState(question.downVotes);
  const [open, setOpen] = useState(false)
  const classes = useStyles()



  const DeleteQuestion = () => {
    dispatch(deleteQuestion(question._id))
    setOpen(false)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
  }, 4000);
  }

  const UpVote = () => {
    if (upVotes.length > 0) {
      return upVotes.find((vote) => vote === userId)
        ? (
          <i class="fa-solid fa-circle-up" style={{ color: 'green' }}></i>
        ) : (
          <i class="fa-solid fa-circle-up" style={{ color: 'gray' }}></i>
        );
    }

    return <i class="fa-solid fa-circle-up" style={{ color: 'gray' }}></i>
  };

  const DownVote = () => {
    if (downVotes.length > 0) {
      return downVotes.find((vote) => vote === userId)
        ? (
          <i class="fa-solid fa-circle-down" style={{ color: 'green' }}></i>
        ) : (
          <i class="fa-solid fa-circle-down" style={{ color: 'gray' }}></i>
        );
    }

    return <i class="fa-solid fa-circle-down" style={{ color: 'gray' }}></i>
  };

  const handleUpVote = async () => {
    dispatch(UpVoteQuestion(question._id));
    if (hasUpvotedquestion) {
      setUpVotes(question.upVotes.filter((id) => id !== userId));
    } else {
      setDownVotes(question.downVotes.filter((id) => id !== userId));
      setUpVotes([...question.upVotes, userId]);
    }
    dispatch(getAllQuestions())
    console.log(upVotes)
  };

  const handleDownVote = async () => {
    dispatch(DownVoteQuestion(question._id));
    if (hasDownvotedquestion) {
      setDownVotes(question.downVotes.filter((id) => id !== userId));
    }
    else {
      setUpVotes(question.upVotes.filter((id) => id !== userId));
      setDownVotes([...question.downVotes, userId]);
    }
    dispatch(getAllQuestions())
    console.log(downVotes)
  };

  return (
    <ChakraProvider>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <ChakraProvider><Avatar name={question.createdby.fullname}  src={question.createdby.pic}></Avatar></ChakraProvider>
          }
          action={
            <>
              <Menu isLazy>
                <MenuButton><MoreVertIcon /></MenuButton>
                <MenuList>
                  <MenuItem icon={<DeleteIcon style={{ marginRight: '30px', color: 'gray' }} />}
                     onClick={() => {setOpen(true)}}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem icon={<EditIcon style={{ marginRight: '30px', color: 'gray' }} />}
                     

                  >
                    Edit
                  </MenuItem>
                </MenuList>
              </Menu>
              <Confirm
                  open={open}
                  onCancel={() => {setOpen(false)}}
                  onConfirm={DeleteQuestion}
                  style={{height:'20%'}}
                />

            </>

          }
          title={ 
          <div className='row'>
          <div className='col-4'> {question.createdby.fullname} </div>
          
            <Typography className='col-7' onClick={() => navigate(`/category/${question.category._id}/notes`)} style={{ color: `${question.category.color}`, textAlign: 'center', fontWeight: '600', display: show ? "flex" : "none" }}>
              {`  ${question.category.name} `}

            </Typography> 
            
        </div>}
          subheader={moment(question.createdAt).fromNow()}
        >
        </CardHeader>

        <CardContent className="row">
          <Col sm={3}>
            <Button.Group>
            <IconButton onClick={handleUpVote}> <UpVote /></IconButton>
              <IconButton> <i>{upVotes.length - downVotes.length}</i></IconButton>
              <IconButton onClick={handleDownVote}><DownVote /></IconButton>
            </Button.Group>
            <Button color='violet' className="row" style={{ marginTop: '19px' }}>{`${AllAnswers.length} Answer${AllAnswers.length > 1 ? 's' : ''}`}</Button>
          </Col>

          <Col sm={8}  onClick={() => navigate(`/Main-Question/${question._id}`)}>
            <Typography
              color="text.secondary"
              style={{ color: 'blue', marginBottom: '20px',cursor:'pointer' }}
            >
                {question.title}
            </Typography>

            <Typography

              variant="subtitle1"
              color="text.secondary"
              component="div" >

              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: question.body }} />

            </Typography>

          </Col>

        </CardContent>
      </Card>
    </ChakraProvider>
  );
}

export default Question;

