import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialPage from './pages/InitialPage.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import AddRound from './pages/AddRound.jsx'
import RoundDetail from './pages/RoundDetail.jsx';
import Prediction from './pages/Prediction.jsx';

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/addRound" element={<AddRound/>} />
                <Route path="/:slug" element={<RoundDetail/>} />
                <Route path="/prediction" element={<Prediction/>} />
            </Routes>
        </Router>
    )
}

export default App;