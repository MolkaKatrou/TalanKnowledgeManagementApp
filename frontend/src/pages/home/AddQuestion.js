import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 
import Editor from "react-quill/lib/index";
import qa from '../../images/qa.png'
import { Container, makeStyles } from "@material-ui/core";
import Home from "./Home";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { createCategoryList } from "../../utils/functions";
import { createQuestion } from "../../Redux/Actions/questionsActions";
import { Navigate, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    height: '100%',
    backgroundColor: 'rgb(225, 228, 232)'
  },

}));
function AddQuestion() {
  var toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction


    ["clean"], // remove formatting button

  ];
  Editor.modules = {
    syntax: true,
    magicUrl: true,
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
  const dispatch =useDispatch()
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const classes = useStyles()
  const categoriesList = useSelector(state => state.categories)
  const { questions, loading } = useSelector((state) => state.questions);
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()


  const handleQuill = (value) => {
    setBody(value);
  };


  const Clear = () => {
    setBody("")
    setTitle("")
    setCategory("")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const Question = {
      createdby: auth.user.id,
      category: category,
      title: title,
      body: body,
    }

    if (title && category && body) {
      dispatch(createQuestion(Question));
      toast.success('Question successfully created');
      Clear()
    }
    else if (!title || !category || !body){
      toast.error('Fill all the fields to ask your question')
  }


  }

  return (
    <>

      <Home>
        <Container className={classes.container}>
          <div className="add-question-container ">
            <div className="head-title ">
              <h1>Ask A Question</h1>
              <img src={qa} style={{ width: '26%' }}></img>
            </div>
            <form >

              <div className="form-group col-md-12">
                <label
                  style={{ fontWeight: 'bold', fontSize: '17px' }}> Category <span className="text-danger">*</span>
                </label>
                <select
                  style={{ backgroundColor: 'transparent' }}
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} >

                  <option style={{ backgroundColor: 'rgba(238, 238, 238)' }} disabled value="">Select a category</option>
                  {
                    createCategoryList(categoriesList.categories).map(option =>
                      <option style={{ backgroundColor: 'rgba(238, 238, 238)' }} value={option.value}>{option.name}</option>)
                  }
                </select>
              </div>
              <div className="title">
                <label style={{ fontWeight: 'bold', fontSize: '17px' }}> Title  <span className="text-danger">*</span> </label>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  style={{ backgroundColor: 'transparent' }}
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                  required
                  onChange={(e) => { setTitle(e.target.value) }}
                  value={title}

                />
              </div>
              <div className="question-option">
                <div className="title">
                  <label style={{ fontWeight: 'bold', fontSize: '19px' }}> Body <span className="required"> <span className="text-danger">*</span> </span> </label>
                  <small>
                    Include all the information someone would need to answer your
                    question
                  </small>
                  <ReactQuill
                    value={body}
                    onChange={handleQuill}
                    modules={Editor.modules}
                    className="react-quill"
                    theme="snow"
                  />
                </div>
              </div>
              <ChakraProvider>
                <Button colorScheme='teal' variant='solid' className="mt-3" onClick={onSubmit}>
                  Add Your Question
                </Button>
              </ChakraProvider>
            </form>
          </div>
        </Container>
      </Home>

    </>
  );
}

export default AddQuestion;