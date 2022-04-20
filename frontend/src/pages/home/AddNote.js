import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import SlidingPane from "react-sliding-pane";
import axios from 'axios';
import "react-sliding-pane/dist/react-sliding-pane.css";
import QuillEditor from '../../Components/QuillEditor';
import '../../assets/TextEditor.css';

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
    const auth = useSelector(state => state.auth)
    const classes = Styles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("")
    const [title, setTitle]=useState("")
    const [category, setCategory] = useState("")
    const [files, setFiles] = useState([])
    const categoriesList = useSelector(state => state.categories)

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }



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

    const onSubmit = (e) => {
        e.preventDefault()
        setContent("")
        const variables = {
            createdby: auth.user.id,
            category:category,
            title: title,
            content: content,            
        }
        
      console.log(variables)
      axios.post('/Api/notes', variables)
      .then(res => {
          console.log(res)
      }

      )

    }

    return (
        <>
            <Tooltip title='Add' onClick={() => setOpen(true)}>
                <Fab color='primary' className={classes.fab}>
                    <Add></Add>
                </Fab>
            </Tooltip>

            <SlidingPane
                className="slidingpane"
                isOpen={open}
                width={window.innerWidth < 600 ? "100%" : "42%"}
                onRequestClose={() => { setOpen(false); }}
            >

                <form>
                    <div className="form-group col-md-12">
                    <label className="font-weight-bold"> Category <span className="required"> <span class="text-danger">*</span> </span> </label>
                        <select
                            className="form-control" placeholder="Title" style={{ backgroundColor: 'transparent', fontFamily: 'sans-serif' }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
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
                              onChange={(e)=>{setTitle(e.target.value)}}
                
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
                            <Button variant='outlined' style={{ fontFamily: 'PT Sans' }} color="secondary" className='me-5' onClick={() => { setOpen(false) }}  >
                                Cancel
                            </Button>
                            <Button variant='outlined' style={{ fontFamily: 'PT Sans' }} color="primary" type='submit' onClick={onSubmit}>
                                Create
                            </Button>
                        </div>
                    </div>

                </form>



            </SlidingPane>

        </>
    )
}
