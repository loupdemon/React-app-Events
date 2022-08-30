import React from 'react';
import Nav from '../../components/nav/Nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    TextareaAutosize,
} from '@mui/material';

function AddEvent() {
    const navigate = useNavigate();
    const [addEvent, setAddEvent] = useState({
        name: '',
        location: '',
        about: '',
        image: '',
        event_date: '',
    });

    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/events`, {
                method: 'POST',
                body: JSON.stringify(addEvent),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            const data = await response.json();
            if (data.insertId) {
                navigate('/home');
            } else if (data.error) {
                alert(data.error);
            } else if (data.sqlMessage) {
                alert('date must be in yyyy-mm-dd format');
            } else {
                alert(data.details[0].message);
            }
        } catch (err) {
            alert(err);
        }
    };
    return (
        <>
            <Nav />
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
                            variant='h5'
                            paddingBottom={2}
                            textAlign='center'
                        >
                            Fill the form to add event
                        </Typography>
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='Name'
                            helperText='Some important text'
                            onChange={(event) =>
                                setAddEvent((prev) => ({
                                    ...prev,
                                    name: event.target.value,
                                }))
                            }
                        />
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='location'
                            helperText='Some important text'
                            onChange={(event) =>
                                setAddEvent((prev) => ({
                                    ...prev,
                                    location: event.target.value,
                                }))
                            }
                        />
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='Image URL'
                            helperText='Some important text'
                            onChange={(event) =>
                                setAddEvent((prev) => ({
                                    ...prev,
                                    image: event.target.value,
                                }))
                            }
                        />
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='Event date'
                            helperText='excepted format yyyy-mm-dd'
                            onChange={(event) =>
                                setAddEvent((prev) => ({
                                    ...prev,
                                    event_date: event.target.value,
                                }))
                            }
                        />
                        <TextareaAutosize
                            sx={{ pb: 2 }}
                            aria-label='minimum height'
                            minRows={3}
                            placeholder='More information about event'
                            style={{ maxWidth: 510 }}
                            onChange={(event) =>
                                setAddEvent((prev) => ({
                                    ...prev,
                                    about: event.target.value,
                                }))
                            }
                        />
                        <Button type='submit'>Add event!</Button>
                    </Box>
                </form>
            </Container>
        </>
    );
}

export default AddEvent;
