import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import Nav from '../../components/nav/Nav';
import AddDialog from '../../components/dialogs/AddDialog';
import {
    Box,
    CircularProgress,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Container,
    Typography,
    Button,
    TextField,
    Dialog,
} from '@mui/material';

function Guests() {
    const navigate = useNavigate();
    // taking id and event name form params
    const { id, event } = useParams();

    // useStates for fetching data from server
    const [guests, setGuests] = useState([]);
    const [status, setStatus] = useState('idle');

    // useStates for guest registration/editing
    const [addGuest, setAddGuest] = useState({
        name: '',
        surname: '',
        email: '',
        age: '',
    });
    const [open, setOpen] = useState(false);

    // UseState to update guest list after its updated in server
    const [guestPosted, setGuestPoste] = useState('');

    const [guestUpdated, setGuestUpdated] = useState('');
    const passData = (data) => {
        setGuestUpdated(data);
        return guestUpdated;
    };

    // caching error state and message type for snackBar
    const [errorState, setErrorState] = useState('');
    const [msgType, setMsgType] = useState('');

    // Fetching all guest registered for event from database
    useEffect(() => {
        const fetchGuests = async () => {
            try {
                setStatus('loading');
                const response = await fetch(
                    `http://localhost:8080/guests/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'jwt'
                            )}`,
                        },
                    }
                );
                const data = await response.json();
                setGuests(data);
                setStatus('fulfilled');
            } catch (err) {
                alert('Unexpected error!');
                setStatus('rejected');
                localStorage.clear();
                navigate('/login');
            }
        };
        fetchGuests();
    }, [guestPosted, guestUpdated]);

    // Deleting a guest from the event
    const onDelete = async (guestId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/guests/${guestId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                }
            );
            const data = await response.json();
            if (data.affectedRows > 0) {
                setGuests((prevState) =>
                    prevState.filter((guest) => guest.id !== guestId)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };
    // Add guest
    const handleChange = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8080/guests/add/${id}`,
                {
                    method: 'POST',
                    body: JSON.stringify(addGuest),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                }
            );
            const data = await response.json();
            if (data.insertId) {
                handleClose();
                setGuestPoste(data);
            } else if (data.error) {
                alert(data.error);
            } else {
                alert(data.details[0].message);
            }
        } catch (err) {
            alert(err);
        }
    };
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    // onClick setting value to true
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <div>
            <Nav />
            {status === 'loading' ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <div>
                    <Container>
                        <Typography variant='h2' paddingBottom={5}>
                            Event: {event}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label='simple table'
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align='right'>
                                            Name
                                        </TableCell>
                                        <TableCell align='right'>
                                            Surname
                                        </TableCell>
                                        <TableCell align='right'>
                                            Email
                                        </TableCell>
                                        <TableCell align='right'>Age</TableCell>
                                        <TableCell align='right'></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {guests.map((guest) => (
                                        <TableRow
                                            key={guest.id}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell
                                                component='th'
                                                scope='row'
                                            >
                                                {guest.id}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {guest.name}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {guest.surname}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {guest.email}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {guest.age}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <AddDialog
                                                    onChange={() =>
                                                        setGuestUpdated(
                                                            guest.id
                                                        )
                                                    }
                                                    id={guest.id}
                                                    name={guest.name}
                                                    surname={guest.surname}
                                                    email={guest.email}
                                                    age={guest.age}
                                                    passData={passData}
                                                ></AddDialog>
                                                <Button
                                                    onClick={() =>
                                                        onDelete(guest.id)
                                                    }
                                                    sx={{
                                                        ':hover': {
                                                            bgcolor:
                                                                'error.main', // theme.palette.primary.main
                                                            color: 'white',
                                                        },
                                                    }}
                                                >
                                                    <HighlightOffIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                    <Container>
                        <Button
                            onClick={handleClickOpen}
                            type=''
                            sx={{
                                ':hover': {
                                    bgcolor: 'primary.main', // theme.palette.primary.main
                                    color: 'white',
                                },
                            }}
                        >
                            <AddIcon />
                        </Button>
                        {/* drop down registration for form */}
                        <Dialog
                            maxWidth={'sm'}
                            disableEscapeKeyDown
                            open={open}
                            onClose={handleClose}
                        >
                            <form onSubmit={handleChange}>
                                <Box
                                    sx={{
                                        m: 5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography paddingBottom={2} variant='h5'>
                                        Fill the form to add guest
                                    </Typography>
                                    <TextField
                                        sx={{ pb: 2 }}
                                        id='outlined-helperText'
                                        label='Name'
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
                                        onChange={(event) =>
                                            setAddGuest((prev) => ({
                                                ...prev,
                                                age: event.target.value,
                                            }))
                                        }
                                    ></TextField>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type='submit'>Add</Button>
                                </Box>
                            </form>
                        </Dialog>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default Guests;
