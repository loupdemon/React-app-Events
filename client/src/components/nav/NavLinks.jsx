import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';

export default function NavLinks() {
    const navigate = useNavigate();
    const onUserLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <>
            <Button color='inherit'>
                <Link
                    to='/home'
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    Events
                </Link>
            </Button>
            <Button color='inherit'>
                <Link
                    to='/add_event'
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    Add Event
                </Link>
            </Button>
            <Button onClick={onUserLogout} color='inherit'>
                <LogoutIcon />
            </Button>
        </>
    );
}
