import React, { useEffect, useState } from 'react'
import { alpha, Box, Button, Collapse, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Menu, MenuItem, Modal, NativeSelect, OutlinedInput, Select, TextField, Typography } from "@material-ui/core"
import { Bookmark, Home, TramRounded } from '@material-ui/icons'
import Drafts from '@mui/icons-material/Drafts';
import AdminPanel from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategories, getAllCategory, updateCategories } from '../Redux/Actions/categoryAction';
import { ListItemButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckBox from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckOutline from '@mui/icons-material/CheckOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'


const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    background: 'linear-gradient(#8084ac 0%, #FFF 20%)',
    boxShadow: '0 2px 2px #8084ac',
    color: 'white',
    paddingTop: theme.spacing(10),
    top: 0,
    [theme.breakpoints.up("sm")]: {
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    color: 'black',
    cursor: "pointer",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
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
  }
}));


const Sidebar = ({ user }) => {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const menu = Boolean(anchorEl);
  const ClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const CloseMenu = () => {
    setAnchorEl(null);
  };

  const classes = useStyles()
  const dispatch = useDispatch()
  const categoriesList = useSelector(state => state.categories)
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState([])
  const [category, setCategory] = useState('')
  const [parentCategoryId, SetParentCategoryId] = useState('')
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState([])
  const [checkedarray, setCheckedarray] = useState([])
  const [expandedarray, setExpandedarray] = useState([])
  const [updateCategory, setUpdateCategory] = useState(false)


  const handleOpen = () => { setOpen(true); setAnchorEl(null) };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getAllCategory())
  })

  /*const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <List disablePadding>
          <ListItem key={category.name}>
            {category.name}

            <Button
              aria-label="more"
              id="long-button"
              aria-controls={menu ? 'long-menu' : undefined}
              aria-expanded={menu ? 'true' : undefined}
              aria-haspopup="true"
              onClick={ClickMenu}
            >
              <MoreVertIcon style={{ width: '15px' }} />
            </Button>

            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={menu}
              onClose={CloseMenu}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >

              <MenuItem onClick={OnDelete}>Delete</MenuItem>
              <MenuItem onClick={CloseMenu}> Update</MenuItem>

            </Menu>

          </ListItem>
          {category.children.length > 0 ? (

            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }}>
                {renderCategories(category.children)}
              </ListItem>
            </List>

          ) : null
          }

        </List>
      );
    }
    return myCategories;
  }*/

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      );
    }
    return myCategories;
  }

  const OnDelete = (id__) => {
    setAnchorEl(null);
    const checkedarray = [];
    const categories = createCategoryList(categoriesList.categories)
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value );
      category && checkedarray.push(category);
    })

    setCheckedarray(checkedarray);
    const checkedIds = checkedarray.map((item, index) => ({ _id: item.value }));


    if (window.confirm("Are you sure you want to delete this category?")) {
    dispatch(deleteCategories(checkedIds))
    }
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

  const handleOpenUpdate = () => {
    const checkedarray = [];
    setUpdateCategory(true);
    setAnchorEl(null);
    const categories = createCategoryList(categoriesList.categories)
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value );
      category && checkedarray.push(category);
    })

    setCheckedarray(checkedarray);

    console.log(expanded, checked, categories, checkedarray)
  };

  const form = {
    name: category,
    parentId: parentCategoryId
  }


  const SubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/Api/categories', form)
      .then(res => {
        setErrors({})
        setOpen(false)
        setCategory('')
        SetParentCategoryId('')
      })
      .catch(err => setErrors(err.res.data))
  }

  const UpdateCategory = () => {
    const formcategory = new FormData();

    checkedarray.forEach((item, index) => {
        formcategory.append('_id', item.value);
        formcategory.append('name', item.name);
        formcategory.append('parentId', item.parentId ? item.parentId : "");
        
    });
        console.log(formcategory)
        dispatch(updateCategories(formcategory))
        setUpdateCategory(false);
  }

  const handleCategoryInput = (key, value, index) => {
    console.log(value);
    const updatedCheckedArray = checkedarray.map((item, _index) =>
      index == _index ? { ...item, [key]: value } : item);
    setCheckedarray(updatedCheckedArray);
  }


  return (
    <Container className={classes.container} >
      <div className={classes.item}>
        <Home className={classes.icon} />
        <Typography className={classes.text}>
          Home
        </Typography>
      </div>
      <div className={classes.item}>
        <Bookmark className={classes.icon} />
        <Typography className={classes.text}>
          Bookmarks
        </Typography>
      </div>
      <div className={classes.item}>
        <Drafts className={classes.icon} />
        <Typography className={classes.text}>
          Drafts
        </Typography>
      </div>
      {user.role === "ADMIN" ? (
        <div className={classes.item}>
          <AdminPanel className={classes.icon} />
          <Typography className={classes.text}>
            <a href="/admin" style={{ textDecoration: 'none', color: 'black' }}>
              Admin Dashboard
            </a>
          </Typography>
        </div>
      ) : (
        ""
      )}
      <Divider className='mb-3' component="li" />
      <div className={classes.item}>
        <CategoryIcon className={classes.icon} />
        <Typography className={classes.text}>
          Categories
        </Typography>
        <Button
          aria-label="more"
          id="long-button"
          aria-controls={menu ? 'long-menu' : undefined}
          aria-expanded={menu ? 'true' : undefined}
          aria-haspopup="true"
          onClick={ClickMenu}
        >
          <MoreVertIcon style={{ width: '15px' }} />
        </Button>

        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={menu}
          onClose={CloseMenu}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleOpen}>Add <AddIcon style={{ marginLeft: '69px', color: '#8084ac' }} /></MenuItem>
          <MenuItem onClick={OnDelete}>Delete <DeleteIcon style={{ marginLeft: '52px', color: '#8084ac' }} /></MenuItem>
          <MenuItem onClick={handleOpenUpdate}> Update<EditIcon style={{ marginLeft: '50px', color: '#8084ac' }} /></MenuItem>

        </Menu>

      </div>

      <div className={classes.list}>
        <CheckboxTree
          nodes={renderCategories(categoriesList.categories)}
          checkModel="all"
          showNodeIcon='false'
          noCascade='true'
          checked={checked}
          expanded={expanded}
          onCheck={checked => setChecked(checked)}
          onExpand={expanded => setExpanded(expanded)}

          icons={{
            check: <CheckOutline style={{ color: '#8084ac', width: '15px' }} />,
            uncheck: <CheckBox style={{ color: '#8084ac', width: '15px' }} />,
            expandClose: <IoIosArrowForward />,
            expandOpen: <IoIosArrowDown />
          }}
        />
      </div>

      {/*Add categories */}

      <Dialog open={open} onClose={handleClose}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small" variant="outlined" color="#8984ac">Cancel</Button>
          <Button onClick={SubmitHandler} size="small" variant="outlined" color="#8884ac">Add</Button>
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

          {
            checkedarray.length > 0 &&
            checkedarray.map((item, index) =>
              <Row className='d-flex justify-content-between' key={index}>
                <Col >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Category"
                    fullWidth
                    variant="standard"
                    value={item.name}
                    placeholder={'Enter the category name'}
                    onChange={(e) => { handleCategoryInput('name', e.target.value, index) }}
                  />
                </Col>
                <Col>

                  <FormControl sx={{ m: 1, minWidth: 120 }} className='mt-4 form-control'>
                    <Select
                      value={item.parentId}
                      onChange={(e) => { handleCategoryInput('parentId', e.target.value, index) }}
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

            )
          }



        </DialogContent>
        <DialogActions className='mt-4'>
          <Button onClick={() => { setUpdateCategory(false) }} size="small" variant="outlined" color="#8984ac">Cancel</Button>
          <Button onClick={UpdateCategory} size="small" variant="outlined" color="#8884ac">Update</Button>
        </DialogActions>
      </Dialog>



    </Container>
  )
}

export default Sidebar