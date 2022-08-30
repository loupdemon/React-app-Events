import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Guests from './pages/gusets/Guests';
import AddEvent from './pages/addEvent/AddEvent';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/add_event' element={<AddEvent />} />
            <Route path='/guests/:id/:event' element={<Guests />} />
        </Routes>
    );
}

export default App;
