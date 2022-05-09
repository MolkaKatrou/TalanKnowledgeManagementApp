import React, { useState } from 'react';
import { Box, Typography } from "@material-ui/core"
import PropTypes from 'prop-types';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react'
import { CategoryContext } from '../Context/CategoryContext';
import { useContext } from 'react';


const ITEM_HEIGHT = 48;

const CustomizedTheme = createTheme({
    palette: {
      action: {
        hover: purple[50] , 
      },
    },
  });
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderRadius: 5,
        paddingRight: theme.spacing(3),
        padding: theme.spacing(0.3),
        fontWeight: theme.typography.fontWeightMedium,
        '&:hover': {
            backgroundColor: CustomizedTheme.palette.action.hover,
        },       

        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },

}));

export default function StyledTreeItem(props) {
    const navigate= useNavigate()
    const { categoryId, setCategoryId, setUpdateCategory, setAnchorEl } = useContext(CategoryContext)

    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelText,
        menu,
        ClickMenu,
        anchorEl,
        CloseMenu,
        handleOpen,
        OnDelete,
        Id,
        ...other


    } = props;

    const handleOpenUpdate = (e) => {
        e.stopPropagation();
        setCategoryId(Id);
        setUpdateCategory(true);
        setAnchorEl(null);
        console.log(categoryId)
      }

    return (  
       <Box>  
        <StyledTreeItemRoot
            key={Id}
            nodeId={Id}
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 2 }} >
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} ></Box>
                    <Typography onClick={() =>navigate(`/category/${Id}`)} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }} >
                        {labelText}
                    </Typography>
                    <ChakraProvider>        
                    <Typography style={{ width: '10%', marginLeft: 'auto', marginRight:0 }} >          
                    <Menu>
                  <MenuButton className='checkbox'><MoreHorizIcon style={{ width: '15px'  }} /></MenuButton>
                  <MenuList style={{background:'white', width:'150px'}}>
                    <MenuItem icon={<DeleteIcon style={{ marginRight: '30px', color: 'gray' }} />}
                      onClick={() => OnDelete(Id)}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem icon={<EditIcon style={{ marginRight: '30px', color: 'gray' }} />}
                      onClick={handleOpenUpdate}
                    >
                      Edit
                    </MenuItem>
                  </MenuList>
                </Menu>
                    </Typography>
                    </ChakraProvider>
                   

                </Box>
            }
            onLabelClick={(event) => {event.preventDefault(); }}
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
        </Box>
    
       
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};
