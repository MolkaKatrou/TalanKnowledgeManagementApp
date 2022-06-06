import {  CircularProgress, Container, makeStyles, Grid} from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import ReactQuill from "react-quill";
import Editor from "react-quill/lib/index";
import Home from "../../pages/home/Home";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createAnswer,  getAllAnswers, getAllQuestions} from "../../Redux/Actions/questionsActions";
import { useParams } from "react-router-dom";
import Answer from "./Answer";
import QuestionAnswer from "./QuestionAnswer";
import { HomeContext } from "../../Context/HomeContext";
import Alert from '@mui/material/Alert';




const useStyles = makeStyles((theme) => ({
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
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '250px'
  },

}))
function MainQuestion() {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],

    ["clean"],
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };

  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  const { setShowAlert, showAlert, comment } = useContext(HomeContext)
  const dispatch = useDispatch()
  const { id } = useParams()
  const classes = useStyles()
  const {questions,loading } = useSelector((state) => state.questions);
  const filteredQuestion = questions.filter(q => q._id == id)
  const [answer, setAnswer] = useState("");
  const auth = useSelector(state => state.auth)
  const userId = auth.user.id
  const { answers } = useSelector((state) => state.answers);
  const Answers = answers.filter(answer => answer.question._id == id)



  const onSubmit = async (e) => {
    e.preventDefault()
    const Answer = {
      createdby: auth.user.id,
      question: id,
      body: answer,
    }

    if (answer) {
      dispatch(createAnswer(Answer));
      setAnswer('')
    }
  }

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    dispatch(getAllAnswers())
    dispatch(getAllQuestions())
  }, [dispatch, id, answer, comment])


  return (
    <Home>
      <Container className={classes.container}>
      { showAlert ? <Alert style={{marginBottom:'15px'}} variant="filled" severity="success">The Answer has been successfully deleted!</Alert> : ""}
        {loading ?
          <CircularProgress size="1em" elevation={2} className={classes.loadingPaper} />
          :
           
          <div className="main">
            <div className="main-container">


              {filteredQuestion.map((question, index) => (
                <Grid key={question._id}>
                  <QuestionAnswer question={question} />
                </Grid>
              ))}

              <div style={{ flexDirection: "column" }} className="all-questions">
                <p
                  style={{
                    marginBottom: "20px",
                    fontSize: "1.8rem",
                    fontWeight: "300",
                  }}
                >
                  Answers
                </p>
                {Answers.map((answer, index) => (
                  <Grid key={answer._id}>
                    <Answer
                      answer={answer}
                    />
                  </Grid>
                ))}
              </div>
            </div>
            <div className="main-answer">
              <h3
                style={{
                  fontSize: "22px",
                  margin: "10px 0",
                  fontWeight: "400",
                }}
              >
                Your Answer
              </h3>
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                modules={Editor.modules}
                className="react-quill"
                theme="snow"
              />
            </div>
            <div
              style={{
                marginTop: "50px",
                maxWidth: "fit-content",
              }}
            >

              <ChakraProvider>
                <Button
                  onClick={onSubmit}
                  colorScheme='blue'
                  size='lg'
                  width='250px'
                  variant='solid'
                  style={{ maxWidth: "fit-content" }}>
                  Add Answer
                </Button>
              </ChakraProvider>
            </div>
          </div>
        }
      </Container>
    </Home>
  );
}

export default MainQuestion;