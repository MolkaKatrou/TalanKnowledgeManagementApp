import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing/Landing';
import About from "./pages/Landing/About";
import Login from './pages//Landing/Login';
import AdminPanel from './pages/admin/AdminPanel';
import Details from './pages/admin/Details';
import Home from './pages/home/Home';
import NotFound from './pages/Error/NotFound';
import NoAccess from './pages/Error/NoAccess';
import Privaterouter from './Login/Privaterouter';
import Adminrouter from './Login/Adminrouter';
import Redirect from './Login/redirect';
import Forgotpassword from './Login/Forgotpassword';
import AdminHeader from './Common/AdminHeader';
import Add from './pages/admin/Add';
import jwt_decode from 'jwt-decode';
import store from './Redux/store'
import { Logout, setUser } from './Redux/Actions/authActions';
import { useSelector } from 'react-redux';
import { setAuth } from './utils/setAuth';
import Resetpassword from './Login/Resetpassword';

if(window.localStorage.jwt){
  const decode =jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now/1000
  if(decode.exp > currentDate){
    store.dispatch(Logout())

  }
}

function App() {
const auth = useSelector(state =>state.auth)
const user = {
  isConnected:auth.isConnected,
  role: auth.user.role
  
} 


  return (
    <>
      <Router>
        <Routes>
          <Route path="/"      element={
          <Redirect user={user}>
          <Landing/>
          </Redirect>}
         />
          
          <Route path="/about" element={
             <Redirect user={user}>
             <About/>
             </Redirect>}
           />
          
          <Route path="/login" element={
              <Redirect user={user}>
              <Login/>
              </Redirect>} />
             
          <Route path="/admin" element={
            <Adminrouter user ={user}> 
            <AdminHeader/>
            <AdminPanel/>
            </Adminrouter>} />
          <Route path='/updateUser/:id' element={<Details/>} />
          <Route path='/Home' element={
            <Privaterouter user ={user}>          
            <Home/>
            </Privaterouter>} />
            <Route path='/Add' element={ 
                          <Adminrouter user ={user}> 
                          <AdminHeader/>
                          <Add/>
                          </Adminrouter>} />
            
          <Route path='/notfound' element={<NotFound/>}/>
          <Route path='/noaccess' element={<NoAccess/>}/>
          <Route path='/forgotpassword' element={<Forgotpassword/>}/>
          <Route path='/resetpassword/:token' element={<Resetpassword/>}/>
        

        </Routes>
      </Router>
    </>
  );
}

export default App;