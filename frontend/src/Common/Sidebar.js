import React, { useEffect, useState, useContext } from 'react';
import { alpha, Box,List,ListItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel,  ListSubheader, makeStyles, Menu, MenuItem, Modal, Select, TextField, Typography } from "@material-ui/core"
import Home from '@mui/icons-material/Home';
import Bookmark from '@mui/icons-material/Bookmarks';
import AdminPanel from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/LayersSharp';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategories, getAllCategory, updateCategories } from '../Redux/Actions/categoryAction';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TreeView from '@mui/lab/TreeView';
import StyledTreeItem from '../Components/StyledTreeItem'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ColorPicker, createColor } from "material-ui-color";
import { InputBase } from '@mui/material';
import { CategoryContext } from '../Context/CategoryContext';



const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    background: 'rgb(225, 228, 232)',
    boxShadow: '0 5px 2px #8084ac',
    paddingTop: theme.spacing(7),
    position: '-webkit-sticky',
    position: 'sticky',
    top: 0,
    [theme.breakpoints.up("sm")]: {
      border: "1px solid #8084ac",
    },
  },
  item: {
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgb(191, 205, 222)',
  },       
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      cursor: "pointer",
    },
  },

  list: {
    color: 'black',
    marginTop: '-10px',
    marginLeft: '-5px',
    fontFamily: 'Monaco',
    fontWeight: '540',
    float: 'left',
    margin: '10px 10px 0 0'
  },

  icon: {
    color: '#8084ac',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "21px",
    },
  },
  text: {
    fontFamily: 'Monaco',
    fontWeight: '540',
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  },

  checkbox: {
    display: "none",
    color: 'red'
  },
}));




const Sidebar = ({ user }) => {
  const { categoryId, setCategoryId, updateCategory, setUpdateCategory, anchorEl, setAnchorEl } = useContext(CategoryContext)
  const navigate=useNavigate()
  const menu = Boolean(anchorEl);
  const ClickMenu = (e) => {
    e.currentTarget.blur();
    setAnchorEl(e.currentTarget);
  };
  const CloseMenu = (e) => {
    e.currentTarget.blur();
    e.preventDefault()
    setAnchorEl(null);
  };



  const classes = useStyles()
  const dispatch = useDispatch()
  const categoriesList = useSelector(state => state.categories)
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [expanded, setExpanded] = useState([])
  const [category, setCategory] = useState('')
  const categoriesResult = categoriesList.categories
  const [categories, setCategories] = useState([]);
  const [parentCategoryId, SetParentCategoryId] = useState('')
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState([])
  const [color, setColor] = useState(createColor(""));

 

  const ChangeColor = (value) => {
    setColor(value);
  };

  const handleToggle = (event, nodeIds) => {
    event.persist()
    let iconClicked = event.target.closest(".MuiTreeItem-iconContainer")
    if(iconClicked) {
      setExpanded(nodeIds);
    }
  };

//only select if icon wasn't clicked
  const handleSelect = (event, accountId) => {
    event.persist()
    let iconClicked = event.target.closest(".MuiTreeItem-iconContainer")
    if(!iconClicked) {
      setSelected(accountId);
    }
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options;
  }

  const handleOpen = () => { setOpen(true); setAnchorEl(null) };
  const handleClose = () => setOpen(false);
  const handleOpenAdd = () => { setOpenAdd(true); setAnchorEl(null) };
  const handleCloseAdd = () => {setOpenAdd(false); setCategory(''); SetParentCategoryId(''); setColor(createColor(''))}
  const currentCategory = useSelector((state) => (categoryId ? createCategoryList(categoriesResult).find((c) => c.value === categoryId) : null));
  console.log(currentCategory)

  const filterContent = (categories, searchTerm) => {
    const result = categories.filter(
      (category) => category.name.toLowerCase().includes(searchTerm) 
      //category?.parentId.toLowerCase().includes(searchTerm) ||
    );
    setCategories(result)
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    filterContent(categoriesResult, searchTerm);
  };
  
  useEffect(() => {
    setCategories(categoriesList.categories)
    dispatch(getAllCategory())
    if (currentCategory) {
      setCategory(currentCategory.name);
      SetParentCategoryId(currentCategory.parentId);
      console.log(currentCategory.name, currentCategory.parentId )
      setCategoryId(0)
    }
  },[categoriesList, currentCategory])

 

  const DeleteCategory =(id,e) => {
    setAnchorEl(false)
    if (window.confirm("Are you sure?")) {
       axios.delete(`/Api/categories/${id}`)
        .then(res => {    
          e.preventDefault()
          setOpen(false)
        })
    }
  }

  const UpdateHandler = (id)=>{
    axios.put(`/Api/categories/${id}`, form)
    .then(res=>{ setShow(true)
    })
  }


  const render = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
          <StyledTreeItem
            Id={category._id}
            labelText={category.name}
            color="#a250f5"
            bgColor="#f3e8fd"
            menu={menu}
            ClickMenu={ClickMenu}
            anchorEl={anchorEl}
            CloseMenu={CloseMenu}
            handleOpen={handleOpen}
            OnDelete={DeleteCategory}              
          >
            {category.children.length > 0 ? (render(category.children)) : null}
          </StyledTreeItem >

      );
    }
    return myCategories;

  }
  const items = render(categories)

  /*const OnDelete = (id__) => {
    setAnchorEl(null);
    const checkedarray = [];
    const categories = createCategoryList(categoriesList.categories)
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value);
      category && checkedarray.push(category);
    })

    setCheckedarray(checkedarray);
    const checkedIds = checkedarray.map((item, index) => ({ _id: item.value }));


    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategories(checkedIds))
    }
  }*/


  const form = {
    name: category,
    parentId: parentCategoryId,
    color: "#"+ color.hex 
  }


  const AddCategory = (e) => {
    e.preventDefault();
    axios.post('/Api/categories', form)
      .then(res => {
        setErrors({})
        setShow(!show)
        setOpenAdd(false)
        setCategory('')
        SetParentCategoryId('')
      })
      .catch(err => setErrors(err.res.data))
  }

  const UpdateCategory = () => {

    const formcategory = {
      name: category,
      parentId: parentCategoryId
    }

    console.log(formcategory)
    dispatch(updateCategories(formcategory))
    setUpdateCategory(false);
  }


  return (
    //<CategoryContext.Provider value={{ categoryId, setCategoryId, setUpdateCategory, setAnchorEl}}>
    <div className={classes.container} >
      <List disableGutters={true} button={true}>
      <ListItem  className={classes.item} onClick={()=>navigate('/Home')}>
        <Home className={classes.icon} />
        <Typography className={classes.text}>
         Home
        </Typography>
      </ListItem>
      
      <ListItem className={classes.item} onClick={()=>navigate('/Bookmarks')}>
        <Bookmark className={classes.icon} />
        <Typography className={classes.text}>
          Bookmarks
        </Typography>
      </ListItem>
      {user.role === "ADMIN" ? (
        <ListItem className={classes.item}>
          <AdminPanel className={classes.icon} />
          <Typography className={classes.text}>
            <a href="/admin" style={{ textDecoration: 'none', color: 'black' }}>
              Admin Dashboard
            </a>
          </Typography>
        </ListItem>
      ) : (
        ""
      )}
      <Divider className='mb-3' component="ul" />

      <ListItem className={classes.item}>
        <CategoryIcon className={classes.icon} />
        <Typography className={classes.text}>
          Categories
        </Typography>
        <AddIcon onClick={handleOpenAdd} style={{ marginLeft: '19px', color: '#8084ac', width:'20px' }}></AddIcon>
      </ListItem>
     </List>
     <IconButton >
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search.."
            onChange={handleSearch}
            inputProps={{ 'aria-label': 'search ' }}
          />
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeToggle={handleToggle}
        expanded={expanded}
        selected={selected}
        onNodeSelect={handleSelect}
      >

        {items.map((item, index) => (<Typography key= {index}>{item}</Typography>))}

      </TreeView>

      {/*Add categories */}

      <Dialog open={openAdd} onClose={handleCloseAdd}  className={classes.paper}>
        <DialogTitle >Add a new category or a subcategory </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category"
            fullWidth
            variant="standard"
            value={category}
            placeholder={'Enter the category name'}
            onChange={(e) => { setCategory(e.target.value) }}
          />


          <FormControl sx={{ m: 1, minWidth: 120 }} className='mt-4'>
            <Select
              value={parentCategoryId}
              onChange={(e) => { SetParentCategoryId(e.target.value) }}
              label="Category"

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
            <ColorPicker placeholder='Choose a color' value={color} onChange={ChangeColor} />  
        </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} size="small" variant="outlined" color="#8984ac">Cancel</Button>
          <Button onClick={AddCategory} size="small" variant="outlined" color="#8884ac">Add</Button>
        </DialogActions>
      </Dialog>

      {/*Edit categories */}


      <Dialog
        open={updateCategory}
        onClose={() => { setUpdateCategory(false) }}
        size="lg"
      >
        <DialogTitle >Edit the category or a subcategory </DialogTitle>
        <DialogContent>
              <Row className='d-flex justify-content-between'>
                <Col >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category"
                    fullWidth
                    variant="standard"
                    placeholder={'Enter the category name'}
                    onChange={(e) => { setCategory(e.target.value) }}
                    value={category}
                  
                  />
                </Col>
                <Col>

                  <FormControl sx={{ m: 1, minWidth: 120 }} className='mt-4 form-control'>
                    <Select
                       value={parentCategoryId}
                       onChange={(e) => { SetParentCategoryId(e.target.value) }}                   
                       label="Category"

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
                </Col>
              </Row>

        </DialogContent>
        <DialogActions className='mt-4'>
          <Button onClick={() => { setUpdateCategory(false) }} size="small" variant="outlined" color="#8984ac">Cancel</Button>
          <Button  onClick={UpdateCategory}  size="small" variant="outlined" color="#8884ac">Update</Button>
        </DialogActions>
      </Dialog>


    </div>
    //</CategoryContext.Provider>
    
  )
}

export default Sidebar


