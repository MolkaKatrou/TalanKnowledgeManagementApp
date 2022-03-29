import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/LandingPages/Home';
import About from "./pages/LandingPages/About";
import Login from './pages//LandingPages/Login';
import AdminPanel from './pages/AdminPanel';
import Navbar from './Components/Navbar';
import Details from './pages/Details';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/"      element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path='/updateUser/:id' element={<Details/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;