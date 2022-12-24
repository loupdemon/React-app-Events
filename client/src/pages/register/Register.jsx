import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    // state for saving user data from inputs

    const [userData, setUserData] = useState({
        user_name: '',
        email: '',
        password: '',
        password1: '',
        password2: '',
    });

    // state to save error messages - password check

    const [errorMessage, setErrorMessage] = useState({
        password_err: '',
    });
    // Here I use effect to track changes to two passwords entries, if they match I set user data password if not setting error message
    useEffect(() => {
        const passwordCheck = (psw1, psw2) => {
            if (psw1 === psw2) {
                setUserData((prev) => ({
                    ...prev,
                    password: psw1,
                }));
                setErrorMessage((prev) => ({
                    ...prev,
                    password_err: '',
                }));
            } else {
                setErrorMessage((prev) => ({
                    ...prev,
                    password_err: 'Password do not mach',
                }));
            }
        };
        passwordCheck(userData.password1, userData.password2);
    }, [userData.password1, userData.password2]);

    // on form submit data is posted to back end and saved if something is not right error messages returned
    const onFormSubmit = async (event) => {
        event.preventDefault();
        if (errorMessage.password_err) {
            alert(errorMessage.password_err);
        } else {
            try {
                const response = await fetch(
                    'https://sgrab-events.herokuapp.com/register',
                    {
                        method: 'POST',
                        body: JSON.stringify(userData),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
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
                        required
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
                        required
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
                        required
                        onChange={(event) =>
                            setUserData((prev) => ({
                                ...prev,
                                password1: event.target.value,
                            }))
                        }
                    />
                    <TextField
                        sx={{ pb: 2 }}
                        id='outlined-helperText'
                        type='password'
                        label='Reapeat the password'
                        required
                        onChange={(event) =>
                            setUserData((prev) => ({
                                ...prev,
                                password2: event.target.value,
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
