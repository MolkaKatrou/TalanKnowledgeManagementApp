import "./new.scss";
import React, { useContext, useEffect, useState } from "react";
import AdminInput from "../../../Components/inputs/AdminInput";
import Alert from '@mui/material/Alert';
import AdminRoleOption from "../../../Components/inputs/AdminRoleOption";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddProfile } from '../../../Redux/Actions/authActions'
import axios from "axios";
import Sidebar from "../../../Components/sidebar/Sidebar";
import Navbar from "../../../Components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import AdminUserInput from "../../../Components/inputs/AdminUserInput";
import add from '../../../images/add-user.png'
import { Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { createCategoryList } from "../../../utils/functions";
import { ColorPicker, createColor } from "material-ui-color";
import { HomeContext } from "../../../Context/HomeContext";
import { createCategory, getAllCategories } from "../../../Redux/Actions/categoryAction";
import toast from "react-hot-toast";

const Categorynew = ({ title }) => {
    const { t } = useContext(HomeContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categoriesList = useSelector(state => state.categories)
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([]);
    const [parentCategoryId, SetParentCategoryId] = useState('')
    const [show, setShow] = useState(false)
    const categoriesResult = categoriesList.categories
    const [color, setColor] = useState(createColor(""));

    const ChangeColor = (value) => {
        setColor(value);
    };
    const AddCategory = (e) => {
        e.preventDefault();
        const form = {
            name: category,
            parentId: parentCategoryId,
            color: "#" + color.hex
        }

        if (!category) {
            toast.error('Choose a category name');
            return;
        }
        if (createCategoryList(categoriesResult).find((c) => c.name.toLowerCase() === category.toLowerCase())) {
            toast.error('This category already exists');
            return;
        }

        dispatch(createCategory(form));
        toast.success('Category successfully created');
        setCategory('')
        SetParentCategoryId('')
    }



    useEffect(async () => {
        dispatch(getAllCategories())
    }, []);


    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <form onSubmit={AddCategory}>
                        <div style={{ backgroundColor: '#E6E6E6' }}>
                            <label style={{ fontWeight: 'bold' }}>Category<span className="text-danger">*</span></label>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                fullWidth
                                variant="standard"
                                value={category}
                                placeholder={t('Enter the category name')}
                                onChange={(e) => { setCategory(e.target.value) }}
                            />

                         
                            <FormControl sx={{ m: 0, minWidth: 250 }} className='mt-5'>
                            <label style={{ fontWeight: 'bold' }}>Parent Category<span className="text-danger">*</span></label>
                                <Select
                                    value={parentCategoryId}
                                    onChange={(e) => { SetParentCategoryId(e.target.value) }}
                                    label={t("Parent Category")}
                                    className='mt-3'

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        createCategoryList(categoriesList.categories).map(option =>
                                            <MenuItem value={option.value}>{option.name}</MenuItem>
                                        )
                                    }

                                </Select>
                            </FormControl>
                            
                            <Box my={4}>
                            <label style={{ fontWeight: 'bold' }}>Category Color<span className="text-danger mt-2">*</span></label>
                                <ColorPicker className='mt-4' placeholder='Choose a color' value={color} onChange={ChangeColor} />
                            </Box>
                        </div>
                        <button className="btn btn-success mt-3" type="submit"> Add Category </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Categorynew;