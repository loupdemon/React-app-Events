const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const eventSchema = joi.object({
  name: joi.string().required().min(4),
  location: joi.string().required(),
  about: joi.string().required(),
  image: joi.string().required(),
  date: joi.date().required(),
});

// getting all events

router.get('/events', isLoggedIn, async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query('SELECT * from events');
    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// creating new event

router.post('/events', isLoggedIn, async (req, res) => {
  const { name, location, about, image, event_date: date } = req.body;
  try {
    await eventSchema.validateAsync({ name, location, about, image, date });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO events SET ?', {
      name,
      location,
      about,
      image,
      event_date: date,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
