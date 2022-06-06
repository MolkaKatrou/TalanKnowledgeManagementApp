import React, { useState, useEffect, useContext } from "react";
import { Box, Card,CardContent, Typography } from "@material-ui/core"
import image1 from '../images/card.png';
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { CardMedia } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { FollowCategory } from "../Redux/Actions/categoryAction";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import '../assets/Navbar.css';
import { HomeContext } from "../Context/HomeContext";
import { createCategoryList } from "../utils/functions";


  


 function CategoryBanner({ category }) {
    const {id} = useParams()
    const dispatch=useDispatch();
    const {followers, setFollowers} = useContext(HomeContext)
    const auth = useSelector(state => state.auth)
    const userId = auth.user.id
    const hasFollowedCategory = category.followers.find((follower) => follower === userId);
    const categoriesList = useSelector(state => state.categories)
    const parentCategory = createCategoryList(categoriesList.categories).filter(cat => cat.value == category.parentId)

    useEffect(() => {
          setFollowers(category.followers)
    },[id])

    const Followers = () => {
        if (followers.length > 0) {
            return followers.find((follower) => follower === userId)
                ? (
                    <Button
                       onClick={handleFollow}
                        color='violet'
                        content='Following'
                        icon='check'
                        label={{ basic: true, color: 'violet', pointing: 'left', content: `${followers.length}` }}
                    />
                ) : (
                    <Button
                       onClick={handleFollow}
                        basic
                        color='violet'
                        content='Follow'
                        icon='add'
                        label={{ basic: true, color: 'violet', pointing: 'left', content:`${followers.length}` }}
                    />
                );
        }

        return  <Button
                    onClick={handleFollow}
                    basic
                    color='violet'
                    content='Follow'
                    icon='add'
                    label={{ basic: true, color: 'violet', pointing: 'left', content: `${followers.length}` }}
                />
    };

    const handleFollow = async () => {
        dispatch(FollowCategory(category.value));
        if (hasFollowedCategory) {
          setFollowers(category.followers.filter((id) => id !== userId));
        } else {
          setFollowers([...category.followers, userId]);
        }
      };
    
    return (
        <div>
        <Card style={{ marginBottom: '30px', background: 'rgb(221, 220, 224)', border: `1px solid ${category.color}`, boxShadow: `0 1px 0 0 ${category.color}` }} className='d-flex justify-content-between'>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {category.name}
                    </Typography>

                    <Typography variant="subtitle1" style={{color:'#817A7A'}}>
                        {parentCategory.map(obj => {return obj.name})}
                    </Typography>
                </CardContent>
            </Box>
            <CardContent >
            <Followers />
            </CardContent>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={image1}
            />
        </Card>
        <Box style={{ width: '100%', marginBottom:'35px' , display:'flex', justifyContent:'center' }}>
            
        <Box className='nav-category'> 
            <NavLink to= {`/category/${category.value}/notes`}   className='nav-links-categories' >Notes</NavLink>
        </Box>

        <Box className='nav-category'>     
            <NavLink to={`/category/${category.value}/QA`} className='nav-links-categories'> Q/A </NavLink> 
        </Box>
               
          
        </Box>
        </div>
    )
}
export default CategoryBanner
