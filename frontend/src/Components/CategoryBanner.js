import React, { useEffect, useState } from "react";
import { makeStyles, Box, Card, Typography } from "@material-ui/core"
import CardContent from '@mui/material/CardContent';
import image1 from '../images/card.png';
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { CardMedia } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { FollowCategory } from "../Redux/Actions/categoryAction";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        height: '100%',
        backgroundColor: 'rgb(225, 228, 232)'
    },

    card: {
        paddingBottom: theme.spacing(4),
    },

}));


 function CategoryBanner({ category }) {
    const dispatch=useDispatch();
    const [followers, setFollowers] = useState(category?.followers)
    const auth = useSelector(state => state.auth)
    const userId = auth.user.id
    const hasFollowedCategory = category.followers.find((follower) => follower === userId);


    const Followers = () => {
        if (followers.length > 0) {
            return followers.find((follower) => follower === userId)
                ? (
                    <Button
                        color='violet'
                        content='Following'
                        icon='check'
                        label={{ basic: true, color: 'violet', pointing: 'left', content: `${followers.length}` }}
                    />
                ) : (
                    <Button
                        basic
                        color='violet'
                        content='Follow'
                        icon='add'
                        label={{ basic: true, color: 'violet', pointing: 'left', content:`${followers.length}` }}
                    />
                );
        }

        return  <Button
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
        <Card style={{ marginBottom: '30px', background: 'rgb(221, 220, 224)', border: `1px solid ${category.color}`, boxShadow: `0 1px 0 0 ${category.color}` }} className='d-flex justify-content-between'>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {category.name}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    </Typography>
                </CardContent>
            </Box>
            <CardContent >
            <IconButton onClick={handleFollow}>
            <Followers />
          </IconButton>
            </CardContent>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={image1}
            />
        </Card>
    )
}
export default CategoryBanner
