import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { InitialPage } from './pages/InitialPage.jsx';
import { Signup}  from './pages/Signup.jsx';
import { Login } from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import AddRound from './pages/AddRound.jsx'
import RoundDetail from './pages/RoundDetail.jsx';

function App(){
    return(
        <Router>
            <Routes>
                {/*{<Route path="/" element={<InitialPage/>} />
                /*<Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />*/}
                <Route path="/" element={<Home/>} />
                <Route path="/addRound" element={<AddRound/>} />
                <Route path="/round" element={<RoundDetail/>} />
                {/*<Route path="/rounds/:courseNameSlug" element={<RoundDetail/>} />*/}
            </Routes>
        </Router>
    )
}

export default App;