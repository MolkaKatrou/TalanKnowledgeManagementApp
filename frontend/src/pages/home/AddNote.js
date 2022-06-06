import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import QuillEditor from '../../Components/QuillEditor';
import { createPost, updatePost } from '../../Redux/Actions/postsActions';
import { useContext } from 'react';
import { HomeContext } from '../../Context/HomeContext';
import { createCategoryList } from '../../utils/functions';
import toast from 'react-hot-toast';

const Styles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: 15,
        right: 10,
    },

    SlidingPane: {
        backgroundColor:'#E9E6EA'
    },

    buttons: {
        display: 'flex',
        margin: '2rem',
        marginLeft: '260px'
    }
}));

export default function AddNote() {
    const [content, setContent] = useState("");
    const auth = useSelector(state => state.auth)
    const classes = Styles();
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [files, setFiles] = useState([])
    const categoriesList = useSelector(state => state.categories)
    const { openNote, setOpenNote, currentId, setCurrentId, dispatch } = useContext(HomeContext)
    const { posts, loading } = useSelector((state) => state.posts);
    const post = useSelector((state) => (currentId ? posts.find((p) => p._id === currentId) : null));
 


    const onEditorChange = (value) => {
        setContent(value)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    useEffect(() => {
        if (post) {
            setContent(post.content);
            setTitle(post.title);
            setCategory(post.category.name);
        }
    }, [currentId]);

    const Clear = () => {
        setOpenNote(false);
        setContent("")
        setTitle("")
        setCategory("")
        setCurrentId(0)
    }

    const onSubmit = (e) => {
        setCurrentId(0)
        e.preventDefault()
        const variables = {
            createdby: auth.user.id,
            category: category,
            title: title,
            content: content,
        }

        if (currentId === 0) {
            if (title && category && content) {          
                dispatch(createPost(variables));
                toast.success('Post successfully created');
                Clear()
            }
            else if (!title || !category || !content){
                toast.error('Fill all the fields to create your post')
            }
        }
        else {
            dispatch(updatePost(currentId, variables))
            Clear()
        }
    }

    return (
        <>

            <Tooltip title='Add' onClick={() => setOpenNote(true)}>
                <Fab color='primary' className={classes.fab}>
                    <Add></Add>
                </Fab>
            </Tooltip>

            <SlidingPane
                className={classes.SlidingPane}
                isOpen={openNote}
                width={window.innerWidth < 600 ? "100%" : "45%"}
                onRequestClose={Clear}
            >

                <form>
                    <div className="form-group col-md-12">
                        <label style={{ fontWeight: 'bold' }}> Category <span className="required"> <span className="text-danger">*</span> </span> </label>
                        <select
                            className="form-control"
                            placeholder="Title"
                            style={{ backgroundColor: 'transparent', fontFamily: 'sans-serif' }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>

                            <option style={{ backgroundColor: 'rgb(233, 233, 227)' }} disabled value="">Select a category</option>
                            {
                                createCategoryList(categoriesList.categories).map(option =>
                                    <option style={{ backgroundColor: 'rgb(233, 233, 227)' }} value={option.value}>{option.name}</option>)
                            }

                        </select>
                    </div>
                    <div className="form-group col-md-12 mt-3">
                        <label style={{ fontWeight: 'bold' }}> Title <span className="required"> <span className="text-danger">*</span> </span> </label>
                        <input
                            type="text"
                            name="title"
                            className='form-control'
                            placeholder="Title"
                            style={{ backgroundColor: 'transparent', fontFamily: 'sans-serif' }}
                            required
                            onChange={(e) => { setTitle(e.target.value) }}
                            value={title}

                        />
                    </div>
                    <div className="form-group col-md-12 editor mt-3">
                        <label style={{ fontWeight: 'bold' }}> Note <span className="required"> <span className="text-danger">*</span> </span> </label>

                        <QuillEditor
                            placeholder={"Share your knowledge"}
                            onEditorChange={onEditorChange}
                            onFilesChange={onFilesChange}
                        />

                        <div className="d-flex mt-4"  >
                            <Button variant='outlined' style={{ fontFamily: 'PT Sans', fontWeight: 'bold' }} color="secondary" className='me-5' onClick={Clear}  >
                                Cancel
                            </Button>
                            <Button variant='outlined' style={{ fontFamily: 'PT Sans', fontWeight: 'bold' }} color="primary" type='submit' onClick={onSubmit}>
                                {currentId ? 'Edit' : 'Create'}
                            </Button>
                        </div>
                    </div>

                </form>



            </SlidingPane>

        </>
    )
}
