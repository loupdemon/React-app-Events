import React, { useState } from 'react';
import {
    Box,
    Container,
    AppBar,
    Typography,
    Button,
    Toolbar,
    IconButton,
    SwipeableDrawer,
    Divider,
    ListItem,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useNavigate, Link } from 'react-router-dom';
import NavLinks from './NavLinks';

function Nav() {
    // const navigate = useNavigate();
    // const onUserLogout = () => {
    //     localStorage.clear();
    //     navigate('/login');
    // };
    const [open, setOpen] = useState(false);
    return (
        <AppBar position='sticky'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <EventAvailableIcon></EventAvailableIcon>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Event Register
                    </Typography>
                    <Box
                        disableGutters
                        sx={{ display: { xs: 'none', sm: 'inline' } }}
                    >
                        <NavLinks />
                    </Box>
                    <Box
                        disableGutters
                        sx={{ display: { xs: 'inline', sm: 'none' } }}
                    >
                        <IconButton disableGutters>
                            <MenuRoundedIcon
                                onClick={() => setOpen(true)}
                                fontSize='large'
                                sx={{
                                    color: 'white',
                                }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
            <SwipeableDrawer
                anchor='right'
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <div>
                    <IconButton>
                        <ChevronRightIcon onClick={() => setOpen(false)} />
                    </IconButton>
                </div>
                <Divider />
                <NavLinks open={open} />
            </SwipeableDrawer>
        </AppBar>
    );
}

export default Nav;
