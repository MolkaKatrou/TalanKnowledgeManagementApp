import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/LandingPages/Landing';
import About from "./pages/LandingPages/About";
import Login from './pages//LandingPages/Login';
import AdminPanel from './pages/AdminPanel';
import Navbar from './Common/Navbar';
import Details from './pages/Details';
import Home from './pages/Home';
import NotFound from './pages/ErrorPages/NotFound';
import NoAccess from './pages/ErrorPages/NoAccess';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/"      element={<Landing/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path='/updateUser/:id' element={<Details/>} />
          <Route path='/Home' element={<Home/>}/>
          <Route path='/notfound' element={<NotFound/>}/>
          <Route path='/noaccess' element={<NoAccess/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;