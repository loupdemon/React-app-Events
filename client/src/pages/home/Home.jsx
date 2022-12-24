import {
    Box,
    CardMedia,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActionArea,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/nav/Nav';

function Home() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [status, setStatus] = useState('idle');

    // Fetching all events from database
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setStatus('loading');
                const response = await fetch(
                    'https://sgrab-events.herokuapp.com/events',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'jwt'
                            )}`,
                        },
                    }
                );
                const data = await response.json();
                setEvents(data);

                setStatus('fulfilled');
            } catch (err) {
                alert('Unexpected error!');
                setStatus('rejected');
                localStorage.clear();
                navigate('/login');
            }
        };
        fetchEvents();
    }, []);

    // removing some unimportant data from date with regex

    const fixDate = (date) => {
        const newDate = date.replace(/\T.*/, '');
        return newDate;
    };
    return (
        // showing loading circle while fetching data
        <div>
            <Nav></Nav>
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
                    <Grid
                        container
                        columnGap={4}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        justifyContent='center'
                    >
                        {events.map((event) => {
                            return (
                                <Card
                                    sx={{
                                        minWidth: 300,
                                        maxWidth: 300,
                                        margin: '1rem 0',
                                    }}
                                    key={event.id}
                                >
                                    <CardActionArea
                                        onClick={() =>
                                            navigate(
                                                `/guests/${event.id}/${event.name}`
                                            )
                                        }
                                    >
                                        <CardMedia
                                            component='img'
                                            height='250'
                                            image={event.image}
                                            alt={event.name}
                                        ></CardMedia>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant='h5'
                                                component='div'
                                            >
                                                {event.name}
                                            </Typography>
                                            <Typography>
                                                {event.location}
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                                align='right'
                                                style={{
                                                    paddingTop: 30,
                                                    color: 'grey',
                                                }}
                                            >
                                                {fixDate(event.event_date)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            );
                        })}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default Home;
