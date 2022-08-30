import React from 'react';
import { Box, AppBar, Typography, Button, Toolbar } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';
function Nav() {
    const navigate = useNavigate();
    const onUserLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <>
            <Box sx={{ mb: 5, flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        <EventAvailableIcon></EventAvailableIcon>
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            Event Register
                        </Typography>
                        <Button color='inherit'>
                            <Link
                                to='/home'
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
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
                                    color: 'white',
                                }}
                            >
                                Add Event
                            </Link>
                        </Button>
                        <Button onClick={onUserLogout} color='inherit'>
                            <LogoutIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Nav;
