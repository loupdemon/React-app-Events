import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        user_name: '',
        email: '',
        password: '',
    });

    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.insertId) {
                navigate('/LOGIN');
            } else if (data.error) {
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
                        Register
                    </Typography>
                    <TextField
                        sx={{ pb: 2 }}
                        id='outlined-helperText'
                        label='User name'
                        onChange={(event) =>
                            setUserData((prev) => ({
                                ...prev,
                                user_name: event.target.value,
                            }))
                        }
                    />
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
                    <Button type='submit'>Create an account!</Button>
                    <Link
                        to='/login'
                        style={{
                            paddingTop: 30,
                            textAlign: 'right',
                            textDecoration: 'none',
                            color: 'grey',
                        }}
                    >
                        Already have an account? Login
                    </Link>
                </Box>
            </form>
        </Container>
    );
}
export default Register;
