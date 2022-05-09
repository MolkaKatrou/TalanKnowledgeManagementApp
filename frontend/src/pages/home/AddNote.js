import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import QuillEditor from '../../Components/QuillEditor';
import '../../assets/TextEditor.css';
import { createPost, updatePost } from '../../Redux/Actions/postsActions';
import { useContext } from 'react';
import { HomeContext } from '../../Context/HomeContext';

const Styles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: 15,
        right: 10,
    },

    buttons: {
        display: 'flex',
        margin: '2rem',
        marginLeft: '260px'
    }
}));

export default function AddNote() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const classes = Styles();
    const [title, setTitle]=useState("")
    const [category, setCategory] = useState("")
    const [files, setFiles] = useState([])
    const categoriesList = useSelector(state => state.categories)
    const {openNote, setOpenNote, currentId, setCurrentId, content, setContent} = useContext(HomeContext)

    const { posts, loading } = useSelector((state) => state.posts);

    const post = useSelector((state) => (currentId ? posts.find((p) => p._id === currentId) : null));
    //console.log(post)

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
      },[currentId]);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const Clear = () => { 
        setOpenNote(false); 
        setContent("")
        setTitle("")
        setCategory("")
        setCurrentId(0)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const variables = {
            createdby: auth.user.id,
            category:category,
            title: title,
            content: content,            
        }
        
      if (currentId === 0) {
        dispatch(createPost(variables));
        Clear()
      }
      else{
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
                className="slidingpane"
                isOpen={openNote}
                width={window.innerWidth < 600 ? "100%" : "42%"}
                onRequestClose={() => { setOpenNote(false); }}
            >

                <form>
                    <div className="form-group col-md-12">
                    <label className="font-weight-bold"> Category <span className="required"> <span class="text-danger">*</span> </span> </label>
                        <select
                            className="form-control" placeholder="Title" style={{ backgroundColor: 'transparent', fontFamily: 'sans-serif' }}
                            value={category}
                            onChange={(e) => setCategory({...category, category: e.target.value})}>
                                <option disabled value="">Select a category</option>
                            {
                                createCategoryList(categoriesList.categories).map(option =>
                                    <option value={option.value}>{option.name}</option>)
                            }

                        </select>
                    </div>
                    <div className="form-group col-md-12 mt-3">
                        <label className="font-weight-bold"> Title <span className="required"> <span class="text-danger">*</span> </span> </label>
                        <input type="text" name="title" className="form-control" placeholder="Title" style={{ backgroundColor: 'transparent', fontFamily: 'sans-serif' }} required
                              onChange={(e)=>{setTitle(e.target.value)}} value={title}
                
                                 />
                    </div>
                    <div className="form-group col-md-12 editor mt-3">
                        <label className="font-weight-bold"> Note <span className="required"> <span class="text-danger">*</span> </span> </label>

                        <QuillEditor
                            placeholder={"Add knowledge"}
                            onEditorChange={onEditorChange}
                            onFilesChange={onFilesChange}
                                                
                        />

                        <div className="d-flex mt-4"  >
                            <Button variant='outlined' style={{ fontFamily: 'PT Sans' }} color="secondary" className='me-5' onClick={Clear}  >
                                Cancel
                            </Button>
                            <Button variant='outlined' style={{ fontFamily: 'PT Sans' }} color="primary" type='submit' onClick={onSubmit}>
                            {currentId ? 'Edit' : 'Create'}
                            </Button>
                        </div>
                    </div>

                </form>



            </SlidingPane>

        </>
    )
}
