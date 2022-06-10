import { makeStyles, Box, Divider, IconButton } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Button, ChakraProvider, Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { HomeContext } from "../../Context/HomeContext";
import { DownVoteAnswer, UpVoteAnswer, deleteAnswer, CommentAnswer, deleteAnswerComment } from "../../Redux/Actions/questionsActions";
import { Confirm } from "semantic-ui-react";
import toast from "react-hot-toast";
import { Card } from "react-bootstrap";


function Answer({ answer }) {
    const { setShowAlert, showAlert, comment, setComment, socket } = useContext(HomeContext)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const userId = auth.user.id
    const hasUpvotedanswer = answer.upVotes.find((vote) => vote === userId);
    const hasDownvotedanswer = answer.downVotes.find((vote) => vote === userId);
    const [upVotes, setUpVotes] = useState(answer.upVotes);
    const [downVotes, setDownVotes] = useState(answer.downVotes);
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(answer?.comments)
    const [open, setOpen] = useState(false)

    const handleNotification = (type) => {
        socket.emit("sendNotification", {
          sender: auth.user,
          receiver: answer.createdby,
          postId : answer?.question._id,
          post:'question',
          type,    
        });
      };
    
    const DeleteAnswer = (id) => {
        dispatch(deleteAnswer(id))
        setOpen(false)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 4000);
    }

    const DeleteAnswerComment = (_id) => {
        dispatch(deleteAnswerComment(_id))
        setOpen(false)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 4000);
    }

    const SubmitComment = (e) => {
        e.preventDefault()
        const finalComment = {
            user: auth.user.id,
            comment: comment
        }
        const newComments = dispatch(CommentAnswer(finalComment, answer._id));
        handleNotification(6)
        setComment('');
        setShow(false)
        setComments(newComments);
        toast.success('Comment added successfully')

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
        dispatch(UpVoteAnswer(answer._id));
        if (hasUpvotedanswer) {
            setUpVotes(answer.upVotes.filter((id) => id !== userId));
        } else {
            setDownVotes(answer.downVotes.filter((id) => id !== userId));
            setUpVotes([...answer.upVotes, userId]);
            handleNotification(7)
        }
    };

    const handleDownVote = async () => {
        dispatch(DownVoteAnswer(answer._id));
        if (hasDownvotedanswer) {
            setDownVotes(answer.downVotes.filter((id) => id !== userId));
        }
        else {
            setUpVotes(answer.upVotes.filter((id) => id !== userId));
            setDownVotes([...answer.downVotes, userId]);
            handleNotification(8)
        }
    };

    return (
        <div className="mb-2">
            <div style={{ backgroundColor: '#cacfd4' }}>
                <div className="d-flex justify-content-between author-answer">
                    <div className=" mt-2 d-flex flex-row my-2 ">
                        <ChakraProvider>
                            <Avatar name={answer.createdby.fullname} src={answer.createdby.pic} size='sm' style={{ height: 32, width: 32 }} className='mx-2'/>
                        </ChakraProvider>


                        <Box className="mt-2 mx-2" style={{fontWeight:'600'}}> {answer.createdby.fullname}</Box>
                        <Box className="mt-2 mx-2 me-2" style={{ color: 'grey' }}>{`Answered ${moment(answer.createdAt).fromNow()}`}</Box>

                    </div>
                    {
                        auth.user.email === answer.createdby.email ? (
                            <ChakraProvider>
                                <Menu isLazy>
                                    <MenuButton><MoreVertIcon /></MenuButton>
                                    <MenuList>
                                        <MenuItem icon={<DeleteIcon style={{ marginRight: '30px', color: 'gray' }} />}
                                            onClick={() => { setOpen(true) }} >
                                            Delete
                                        </MenuItem>
                                        <MenuItem icon={<EditIcon style={{ marginRight: '30px', color: 'gray' }} />}>
                                            Edit
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </ChakraProvider>
                        ) : ('')
                    }
                    <Confirm
                        open={open}
                        onCancel={() => { setOpen(false) }}
                        onConfirm={() => { DeleteAnswer(answer._id) }} 
                        style={{ height: '22%' }}
                    />
                </div>

                <div className="all-questions-container">

                    <div className="all-questions-left">
                        <div className="all-options" >
                            <IconButton className="arrow" onClick={handleUpVote}> <UpVote /></IconButton>
                            <p className="arrow"> <i>{upVotes?.length - downVotes?.length || 0}</i></p>
                            <IconButton className="arrow" onClick={handleDownVote}><DownVote /></IconButton>
                        </div>
                    </div>
                  
                    <div className="question-answer">
                        <div className='card-content' dangerouslySetInnerHTML={{ __html: answer.body }} />
                    </div>
                   
                </div>
            </div>
            {answer.comments?.map((c, i) => (
                <div className="comments">
                    <div className="d-flex justify-content-between author-answer">
                        <div className=" my-1 d-flex flex-row ">
                            <ChakraProvider>
                                <Avatar style={{ height: 30, width: 30 }} size='sm' className='mx-2' name={c.user.fullname} src={c.user.pic} />
                            </ChakraProvider>
                            <Box className="mt-2 mx-2" style={{fontSize:'11px',fontWeight:'600'}}> {c.user.fullname}</Box>
                            <Box className="mt-2 mx-2 me-2" style={{ color: 'grey', fontSize:'11px'}}>{`Added ${moment(c.createdAt).fromNow()}`}</Box>

                        </div>
                        {
                            auth.user.email === answer.createdby.email ? (
                                <ChakraProvider>
                                    <Menu isLazy>
                                        <MenuButton><MoreVertIcon /></MenuButton>
                                        <MenuList>
                                            <MenuItem icon={<DeleteIcon style={{ marginRight: '30px', color: 'gray' }} />}
                                                onClick={() => { DeleteAnswerComment(c._id) }} >
                                                Delete
                                            </MenuItem>
                                            <MenuItem icon={<EditIcon style={{ marginRight: '30px', color: 'gray' }} />}>
                                                Edit
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>

                                </ChakraProvider>

                            ) : ('')
                        }
                    </div>
                    <div className="comment">
                        {c.comment}
                    </div>
                </div>
            ))} <div className="comments">

                <p
                    style={{ margin: "5px 0px", padding: "10px" }}
                    onClick={() => setShow(!show)}>
                    Add a comment
                </p>
                {show && (
                    <div className="title">
                        <textarea
                            style={{
                                margin: "5px 0px",
                                padding: "10px",
                                border: "1px solid rgba(0, 0, 0, 0.2)",
                                borderRadius: "3px",
                                outline: "none",
                                backgroundColor: 'transparent'
                            }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            type="text"
                            placeholder="Add your comment..."
                            rows={5}
                        />
                        <ChakraProvider>
                            <Button colorScheme='teal' variant='solid' className="mt-3" disabled={!comment} onClick={SubmitComment}>
                                Add Comment
                            </Button>

                        </ChakraProvider>
                    </div>


                )}
            </div>


        </div>

    );
}

export default Answer;











