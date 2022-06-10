import React, {useState} from 'react'
import { Grid } from "@material-ui/core"
import HomeNavbar from '../../Common/homeNavbar';
import Sidebar from '../../Common/Sidebar';
import AddNote from './AddNote';
import Rightbar from '../../Common/Rightbar';
import { useSelector } from 'react-redux';
import { CategoryContext } from '../../Context/CategoryContext';



const Home = ({children, searchPost, handleKeyPress, search, setSearch}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [updateCategory, setUpdateCategory] = useState(false)
  const [parentCategoryIdName, setParentCategoryIdName] = useState('')
  const [categoryIdName, setCategoryIdName] = useState('')
  const [open, setOpen] = useState(false)

  const auth = useSelector(state => state.auth)
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role
  }

  return (
    
      <CategoryContext.Provider value={{categoryId,categoryIdName, setCategoryIdName,parentCategoryIdName,setParentCategoryIdName, setCategoryId, setUpdateCategory, updateCategory, anchorEl, setAnchorEl, open,setOpen}}>
      <HomeNavbar searchPost={searchPost}
                  handleKeyPress={handleKeyPress}
                  search={search}    
                  setSearch={setSearch}         
                  />
      <Grid container style={{height:'100vh'}}>
        <Grid item sm={2} xs={2} >
          <Sidebar user={user}/>
        </Grid>
        <Grid item sm={7} xs={10}>
          {children}
 
        </Grid>
        <Grid item sm={3} className="d-none d-sm-block">
          <Rightbar/>
        </Grid>
      </Grid>
      <AddNote/>
      </CategoryContext.Provider> 
    
  )
}

export default Home