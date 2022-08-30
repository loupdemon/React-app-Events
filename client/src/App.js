import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
        </Routes>
    );
}

export default App;
