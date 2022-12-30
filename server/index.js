const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const authRouter = require('./src/routes/auth');
const eventsRouter = require('./src/routes/events');
const guestsRouter = require('./src/routes/guests');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

// this is to get all front end data to be taken and used in nodejs
// app.use(express.static(path.join(__dirname + '/public')));

app.use('/', authRouter);
app.use('/', eventsRouter);
app.use('/', guestsRouter);

// This code sets up an express server that listens for HTTP GET requests on all routes (*).
// When a request is received, it sends the index.html file located in the build directory.
// It allows to load a certain URL path after page refresh

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
