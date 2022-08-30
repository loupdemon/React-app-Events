import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, Button, TextField } from '@mui/material';
export default function AddDialog(props) {
    const { id, name, surname, email, age, passData } = props;
    const [addGuest, setAddGuest] = useState({
        name,
        surname,
        email,
        age,
    });
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onGuestEdit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/guests/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(addGuest),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            const data = await response.json();
            if (data.affectedRows > 0) {
                passData(data);
                handleClose();
            } else {
                alert(data.err.details[0].message);
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{
                    ':hover': {
                        bgcolor: 'primary.main', // theme.palette.primary.main
                        color: 'white',
                    },
                }}
            >
                <EditIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={onGuestEdit}>
                    <Box
                        sx={{
                            m: 5,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography paddingBottom={2} variant='h5'>
                            Edit Guest information
                        </Typography>
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='Name'
                            defaultValue={name}
                            onChange={(event) =>
                                setAddGuest((prev) => ({
                                    ...prev,
                                    name: event.target.value,
                                }))
                            }
                        ></TextField>
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='surname'
                            defaultValue={surname}
                            onChange={(event) =>
                                setAddGuest((prev) => ({
                                    ...prev,
                                    surname: event.target.value,
                                }))
                            }
                        ></TextField>
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='Email'
                            defaultValue={email}
                            onChange={(event) =>
                                setAddGuest((prev) => ({
                                    ...prev,
                                    email: event.target.value,
                                }))
                            }
                        ></TextField>
                        <TextField
                            sx={{ pb: 2 }}
                            id='outlined-helperText'
                            label='Age'
                            defaultValue={age}
                            onChange={(event) =>
                                setAddGuest((prev) => ({
                                    ...prev,
                                    age: event.target.value,
                                }))
                            }
                        ></TextField>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Edit</Button>
                    </Box>
                </form>
            </Dialog>
        </>
    );
}
