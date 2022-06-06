import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing/Landing';
import About from "./pages/Landing/About";
import Login from './pages//Landing/Login';
import AdminPanel from './pages/admin/AdminPanel';
import Details from './pages/admin/Details';
import NotFound from './pages/Error/NotFound';
import NoAccess from './pages/Error/NoAccess';
import Adminrouter from './Login/Adminrouter';
import { Redirect, Privaterouter } from './Login/privateRouter';
import Forgotpassword from './Login/Forgotpassword';
import AdminHeader from './Common/AdminHeader';
import Add from './pages/admin/Add';
import jwt_decode from 'jwt-decode';
import store from './Redux/store'
import { Logout, setUser } from './Redux/Actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './utils/setAuth';
import Resetpassword from './Login/Resetpassword';
import CategoryNotes from './pages/home/CategoryNotes';
import Feed from './pages/home/Feed';
import Bookmark from './pages/home/Bookmark';
import PostDetails from './Components/posts/PostDetails';
import CategoryQA from './pages/home/CategoryQ&A';
import { HomeContext } from './Context/HomeContext';
import AddQuestion from './pages/home/AddQuestion';
import MainQuestion from './Components/Questions&Answers/MainQuestion';
import Chats from './pages/home/Chats';
import io from "socket.io-client";
import Profile from './pages/home/Profile';
import toast, { Toaster } from 'react-hot-toast';


if (window.localStorage.user || window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt)
  const user = JSON.parse(localStorage.getItem('user'))
  store.dispatch(setUser(user))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now / 1000
  if (decode.exp > currentDate) {
    store.dispatch(Logout())
  }
}

const ENDPOINT = "http://localhost:4000";
var socket

function App() {
  const [currentId, setCurrentId] = useState(0);
  const [openNote, setOpenNote] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [liked, setLiked] = useState('false');
  const [search, setSearch] = useState('');
  const [followers, setFollowers] = useState([])
  const [comment, setComment] = useState('')

  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [notificationChat, setNotificationChat ]= useState(false)
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage?.getItem('jwt'))?.split(" ")[1]
  const auth = useSelector(state => state.auth)
  socket = io(ENDPOINT);
  const [ fetchAgain, setFetchAgain ] = useState(false)

  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role

  }

  useEffect(() => {
    socket.emit("setup", auth.user);
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
}, [])


  return (
    <HomeContext.Provider
      value={{ socket,fetchAgain, setFetchAgain,
        socketConnected, setSocketConnected,isTyping, setIsTyping,
        token, dispatch, comment, setComment, openNote, liked, setLiked, search, setSearch, 
        followers, setFollowers, setOpenNote, showAlert, setShowAlert, currentId, setCurrentId,
        selectedChat, setSelectedChat, notification, setNotification, chats, setChats,
        notificationChat, setNotificationChat
      }}>
         <Toaster
          toastOptions={{
            success: {
              style: {
                color:'white',
                backgroundColor:'#89CA97'
              },
            },
            error: {
              style: {
                color:'white',
                backgroundColor:'#CF933A'
              },
            },
          }}
         
         />
       
       
      <Router>
        <Routes>
          <Route path="/" element={
            <Redirect user={user}>
              <Landing />
            </Redirect>}
          />

          <Route path="/about" element={
            <Redirect user={user}>
              <About />
            </Redirect>}
          />

          <Route path="/login" element={
            <Redirect user={user}>
              <Login />
            </Redirect>} />

          <Route path="/admin" element={
            <Adminrouter user={user}>
              <AdminHeader />
              <AdminPanel />
            </Adminrouter>} />
          <Route path='/updateUser/:id' element={<Details />} />
          <Route path='/Home' element={
            <Privaterouter user={user}>
              <Feed />
            </Privaterouter>} />
          <Route path='/Home/search' element={
            <Privaterouter user={user}>
              <Feed />
            </Privaterouter>} />
          <Route path='/Bookmarks' element={
            <Privaterouter user={user}>
              <Bookmark />
            </Privaterouter>} />

          <Route path='/Add-Question' element={
            <Privaterouter user={user}>
              <AddQuestion />
            </Privaterouter>} />

          <Route path='/Main-Question/:id' element={
            <Privaterouter user={user}>
              <MainQuestion />
            </Privaterouter>} />

          <Route path='/Chats' element={
            <Privaterouter user={user}>
              <Chats />
            </Privaterouter>} />

            <Route path='/Profile/:id' element={
            <Privaterouter user={user}>
              <Profile/>
            </Privaterouter>} />

          <Route path='/Add' element={
            <Adminrouter user={user}>
              <AdminHeader />
              <Add />
            </Adminrouter>} />

          <Route path='/notfound' element={<NotFound />} />
          <Route path='/noaccess' element={<NoAccess />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/resetpassword/:token' element={<Resetpassword />} />
          <Route path='/category/:id/notes' element={
            <Privaterouter user={user}>
              <CategoryNotes />
            </Privaterouter>} />
          <Route path='/category/:id/QA' element={
            <Privaterouter user={user}>
              <CategoryQA />
            </Privaterouter>} />
          <Route path='/post/:id' element={
            <Privaterouter user={user}>
              <PostDetails />
            </Privaterouter>} />

        </Routes>
      </Router>
    </HomeContext.Provider>
  );
}

export default App;