import { Box, FormControl, IconButton, Input, InputGroup, InputRightElement, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HomeContext } from '../../Context/HomeContext'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ProfileModal from './ProfileModal';
import { getSender, getSenderFull } from './ChatLogic';
import UpdateChatModal from './UpdateChatModal';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import SendIcon from '@mui/icons-material/Send';


var selectedChatCompare

export default function SingleChat({ fetchAgain, setFetchAgain }) {
    const {socket, selectedChat,isTyping, setIsTyping, setSelectedChat, socketConnected, setSocketConnected, notificationChat, setNotificationChat, notification, setNotification, token } = useContext(HomeContext)
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const toast = useToast();
    const [typing, setTyping] = useState(false);
    const auth = useSelector(state => state.auth)
    const user = auth.user

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`);
            setMessages(data);
            setLoading(false);
            socket.emit('join chat', selectedChat._id);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };
    const handleKeyPress = async (e) => {
        if (e.key === "Enter" && newMessage) {
            sendMessage()
        }

    }
    

    const sendMessage = async (event) => {
            socket.emit('stop typing', selectedChat._id)
            try {
                setNewMessage('')
                const { data } = await axios.post("/api/message", { content: newMessage, chatId: selectedChat });
                console.log(data)
                socket.emit("new message", data)
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

            }
        }
        useEffect(() => {
            socket.on('typing', () => setIsTyping(true))
            socket.on('stop typing', () => setIsTyping(false))      
        }, [])

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);


    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                    if (!notification.includes(newMessageReceived)) {
                      setNotification([newMessageReceived, ...notification]);
                      setFetchAgain(!fetchAgain);
                      setNotificationChat(true)
                    }
            }
            else {
                setMessages([...messages, newMessageReceived])
            }
        })
    })

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;

        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    }
    useEffect(() => {
        socket.emit("setup", auth.user);
        socket.on('connected', () => setSocketConnected(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    }, [])
    

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            d={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIosIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal
                                    user={getSenderFull(user, selectedChat.users)}
                                />
                            </>

                        ) : (
                            <>
                                {selectedChat.chatName}
                                <UpdateChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />

                            </>
                        )

                        }
                    </Text>
                    <Box
                        d="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} user={user} />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={handleKeyPress}
                            id="first-name"
                            isRequired
                            mt={3}
                        >
                            {isTyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={20}
                                        style={{ marginBottom: 15, display: 'flex', justifyContent: 'center' }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}


                            <InputGroup>
                                <Input
                                    variant="filled"
                                    bg="#E0E0E0"
                                    placeholder="Enter a message.."
                                    value={newMessage}
                                    onChange={typingHandler}
                                    autoComplete="off"

                                />
                                <InputRightElement children={<SendIcon style={{ color: 'blue', cursor: 'pointer' }} onClick={sendMessage} />} />
                            </InputGroup>


                        </FormControl>


                    </Box>

                </>
            ) : (
                <Box className='d-flex justify-content-center align-items-center' h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start Chatting
                    </Text>
                </Box>
            )


            }

        </>
    )
}
