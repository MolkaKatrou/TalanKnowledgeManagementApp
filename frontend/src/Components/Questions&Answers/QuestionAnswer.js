import { Typography, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { DownVoteQuestion, UpVoteQuestion } from "../../Redux/Actions/questionsActions";
import { useParams } from "react-router-dom";
import moment from 'moment';
import ReactHtmlParser from "react-html-parser";


function QuestionAnswer({ question }) {
    const {id} = useParams()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const userId = auth.user.id
    const hasUpvotedquestion = question?.upVotes.find((vote) => vote === userId);
    const hasDownvotedquestion = question?.downVotes.find((vote) => vote === userId);
    const [upVotes, setUpVotes] = useState(question?.upVotes);
    const [downVotes, setDownVotes] = useState(question?.downVotes);


    const UpVote = () => {
        if (upVotes?.length > 0) {
            return upVotes?.find((vote) => vote === userId)
                ? (
                    <i class="fa-solid fa-circle-up" style={{ color: 'green' }}></i>
                ) : (
                    <i class="fa-solid fa-circle-up" style={{ color: 'gray' }}></i>
                );
        }

        return <i class="fa-solid fa-circle-up" style={{ color: 'gray' }}></i>
    };

    const DownVote = () => {
        if (downVotes?.length > 0) {
            return downVotes?.find((vote) => vote === userId)
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
            setUpVotes(question?.upVotes.filter((id) => id !== userId));
        } else {
            setDownVotes(question?.downVotes.filter((id) => id !== userId));
            setUpVotes([...question?.upVotes, userId]);
        }

    };

    const handleDownVote = async () => {
        dispatch(DownVoteQuestion(question._id));
        if (hasDownvotedquestion) {
            setDownVotes(question?.downVotes.filter((id) => id !== userId));
        }
        else {
            setUpVotes(question?.upVotes.filter((id) => id !== userId));
            setDownVotes([...question?.downVotes, userId]);
        }
    };


    return (
        <>
            <div className="main-top">
                <h2 className="main-question" >{question?.title}</h2>
            </div>
            <Typography variant='subtitle1' gutterBottom style={{ color: `${question?.category.color}` }}>
                {question?.category.name}
            </Typography>
            <div className="main-desc">
                <div className="info">
                    <p>
                        Asked by
                        <span>{question?.createdby.fullname}</span>
                    </p>
                    <p>
                        Posted<span>{moment(question.createdAt).fromNow()}</span>
                    </p>
                </div>
            </div>
            <div className="all-questions">
                <div className="all-questions-container">
                    <div className="all-questions-left">
                        <div className="all-options">
                            <IconButton className="arrow" onClick={handleUpVote}> <UpVote /></IconButton>
                            <IconButton className="arrow"> <i>{upVotes?.length - downVotes?.length || 0}</i></IconButton>
                            <IconButton className="arrow" onClick={handleDownVote}><DownVote /></IconButton>
                            <BookmarkIcon />
                        </div>
                    </div>
                    <div className="question-answer">
                        <p> <div className='card-content'>{ReactHtmlParser(question?.body)}</div> </p>
                    </div>
                </div>
            </div>
        </>


    );
}

export default QuestionAnswer;