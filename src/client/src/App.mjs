import React from 'react';
import {Router, Route, Routes } from 'react-router-dom';
import InitialPage from './pages/InitialPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AddRound from './pages/AddRound';
import RoundDetail from './pages/RoundDetail';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/addRound" element={<AddRound/>} />
                <Route path="/home/:slug" element={<RoundDetail/>} />
            </Routes>
        </Router>
    )
}

export default App;