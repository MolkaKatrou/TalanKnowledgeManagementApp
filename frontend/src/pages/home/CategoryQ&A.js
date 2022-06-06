import React, { useEffect, useState } from "react";
import Home from './Home'
import { Container, makeStyles, CircularProgress, Typography, Box, Grid } from "@material-ui/core"
import CategoryBanner from "../../Components/CategoryBanner";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getAllPosts } from '../../Redux/Actions/postsActions';
import { useTheme } from '@mui/material/styles';
import FilterListIcon from "@material-ui/icons/FilterList";
import Question from "../../Components/Questions&Answers/Question";
import { createCategoryList } from "../../utils/functions";
import { getAllQuestions } from "../../Redux/Actions/questionsActions";
import { Button } from "semantic-ui-react";

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


export default function CategoryQA() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const QuestionsList = useSelector(state => state.questions)
  const categoriesList = useSelector(state => state.categories)
  const categoryQuestions = QuestionsList.questions
  const filteredQuestions = categoryQuestions.filter(cat => cat.category._id == id)
  const filteredCategories = createCategoryList(categoriesList.categories).filter(cat => cat.value == id)
  const [latest, setLatest] = useState(true)

  useEffect(() => {
    dispatch(getAllQuestions())
  }, [dispatch])


  const renderLatestQuestions = filteredQuestions.reverse().map((question, index) => (
    <Grid key={question._id}>
      <Question
        question={question}
      />
    </Grid>
  )
  )
  const renderTrendingQuestions = filteredQuestions.sort(function (one, other) {
    let otherVotes = other.upVotes.length - other.downVotes.length
    let oneVotes = one.upVotes.length - one.downVotes.length
    return otherVotes - oneVotes;
  }).map((question, index) => (
    <Grid key={question._id}>
      <Question
        question={question}
      />
    </Grid>
  )
  )

  return (
    <Home>
      <Container className={classes.container}>
        {QuestionsList.loading ?
          < CircularProgress size="3em" elevation={4} className={classes.loadingPaper} />
          :

          filteredCategories.map((category, index) => (
            <CategoryBanner category={category} />
          ))}

        <div className="main">
          <div className="main-container">
            <div className="main-top">
              <h2>All Questions</h2>

              <Button variant="contained" color="primary" onClick={() => navigate('/Add-Question')}>  Ask Question </Button>

            </div>
            <div className="main-desc">
              <p>{`${filteredQuestions.length} Question${filteredQuestions.length > 1 ? 's' : ''}`}</p>
              <div className="main-tabs">
                <Button.Group>
                  <Button onClick={()=> setLatest(true)}>Latest</Button>
                  <Button onClick={()=> setLatest(false)}>Trending</Button>
                </Button.Group>
              </div>
              <div className="main-filter-item">
                <FilterListIcon />
                <p>Filter</p>

              </div>
            </div>
            <div className="questions">

              <div className="question">
                {latest ? renderLatestQuestions : renderTrendingQuestions}
              </div>

            </div>
          </div>
        </div>

      </Container>
    </Home>

  )
}
