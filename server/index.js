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
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', authRouter);
app.use('/', eventsRouter);
app.use('/', guestsRouter);

app.all('*', (req, res) => {
  res.status(404).send('Path not found!');
});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
