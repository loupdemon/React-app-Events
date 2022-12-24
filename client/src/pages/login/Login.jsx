import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                'https://sgrab-events.herokuapp.com/login',
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            // saving JWT in local storage
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                navigate('/home');
            }
            // Edge cases
            else if (data.error) {
                alert(data.error);
            } else {
                alert(data.details[0].message);
            }
        } catch (err) {
            alert(err);
        }
    };
    return (
        <Container maxWidth='sm'>
            <form onSubmit={onFormSubmit}>
                <Box
                    display='flex'
                    flexDirection={'column'}
                    marginTop={5}
                    padding={3}
                    boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}
                >
                    <Typography
                        variant='h3'
                        paddingBottom={2}
                        textAlign='center'
                    >
                        Log in
                    </Typography>
                    <TextField
                        sx={{ pb: 2 }}
                        id='outlined-helperText'
                        label='Email'
                        onChange={(event) =>
                            setUserData((prev) => ({
                                ...prev,
                                email: event.target.value,
                            }))
                        }
                    />
                    <TextField
                        sx={{ pb: 2 }}
                        id='outlined-helperText'
                        type='password'
                        label='Password'
                        onChange={(event) =>
                            setUserData((prev) => ({
                                ...prev,
                                password: event.target.value,
                            }))
                        }
                    />
                    <Button type='submit'>Log in now!</Button>
                    <Link
                        to='/'
                        style={{
                            paddingTop: 30,
                            textAlign: 'right',
                            textDecoration: 'none',
                            color: 'grey',
                        }}
                    >
                        Don't have an account? Register
                    </Link>
                </Box>
            </form>
        </Container>
    );
}

export default Login;
