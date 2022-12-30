import React from 'react';
import { Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';

export default function NavLinks(props) {
    const navigate = useNavigate();
    const onUserLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    if (props.open === true) {
        return (
            <>
                <Button
                    sx={{ mr: 5, pl: 2 }}
                    color='inherit'
                    justify='flex-start'
                    style={{ justifyContent: 'flex-start' }}
                >
                    <Link
                        sx={{ mr: 15 }}
                        to='/home'
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        Events
                    </Link>
                </Button>
                <Button
                    color='inherit'
                    style={{ justifyContent: 'flex-start' }}
                    sx={{ mr: 5, pl: 2 }}
                >
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
                <Button
                    sx={{ mr: 5, pl: 2 }}
                    onClick={onUserLogout}
                    color='inherit'
                    style={{ justifyContent: 'flex-start' }}
                >
                    <LogoutIcon />
                </Button>
            </>
        );
    } else {
        return (
            <>
                <Button
                    color='inherit'
                    justify='flex-start'
                    style={{ justifyContent: 'flex-start' }}
                >
                    <Link
                        sx={{ mr: 15 }}
                        to='/home'
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        Events
                    </Link>
                </Button>
                <Button
                    color='inherit'
                    style={{ justifyContent: 'flex-start' }}
                >
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
                <Button
                    onClick={onUserLogout}
                    color='inherit'
                    style={{ justifyContent: 'flex-start' }}
                >
                    <LogoutIcon />
                </Button>
            </>
        );
    }
}
