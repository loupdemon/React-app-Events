const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../../config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const guestsSchema = joi.object({
  name: joi.string().required(),
  surname: joi.string().required(),
  email: joi.string().email().required(),
  age: joi.number().required(),
  // eventId: joi.number().required(),
});

// get all guests by event id
router.get('/guests/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [guests] = await connection.query(
      `SELECT * from guests WHERE event_id = ${Number(id)}`,
    );
    await connection.end();
    return res.json(guests);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// adding a guest to event
router.post('/guests/add/:id', isLoggedIn, async (req, res) => {
  const { eventId } = req.params;
  const { name, surname, email, age } = req.body;
  try {
    await guestsSchema.validateAsync({ name, surname, email, age });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO guests SET ?', {
      name,
      surname,
      email,
      age,
      event_id: eventId,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
