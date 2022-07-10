import { ChakraProvider } from '@chakra-ui/react'
import { Box, Container, makeStyles } from '@material-ui/core'
import { Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import HomeNavbar from '../../Common/homeNavbar'
import Rightbar from '../../Common/Rightbar'
import Sidebar from '../../Common/Sidebar'
import ChatBox from '../../Components/Chats/ChatBox'
import MyChats from '../../Components/Chats/MyChats'
import { HomeContext } from '../../Context/HomeContext'
import AddNote from './AddNote'
import Home from './Home'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(8),
        height: '100%',
        backgroundColor: 'rgb(225, 228, 232)'
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '250px'
    },
}));

function Chats() {
    const { fetchAgain, setFetchAgain } = useContext(HomeContext)
    const classes = useStyles()
    const auth = useSelector(state => state.auth)
    const user = {
        isConnected: auth.isConnected,
        role: auth.user.role
    }

    return (
        <>

            <Home>
                <ChakraProvider>
                    <MyChats fetchAgain={fetchAgain} />
                    <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                </ChakraProvider>
            </Home>
        </>
    )
}

export default Chats