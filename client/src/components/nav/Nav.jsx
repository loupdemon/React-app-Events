import React, { useState } from 'react';
import {
    Box,
    Container,
    AppBar,
    Typography,
    Toolbar,
    IconButton,
    SwipeableDrawer,
    Divider,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
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
                <Toolbar>
                    <EventAvailableIcon></EventAvailableIcon>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Event Register
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        <NavLinks />
                    </Box>
                    <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                        <IconButton onClick={() => setOpen(true)}>
                            <MenuRoundedIcon
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
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Divider />
                <NavLinks open={open} />
            </SwipeableDrawer>
        </AppBar>
    );
}

export default Nav;
