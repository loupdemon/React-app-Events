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
});

const updateSchema = joi.object({
  name: joi.string().required(),
  surname: joi.string().required(),
  email: joi.string().email().required(),
  age: joi.number().required(),
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
  const { id } = req.params;
  const { name, surname, email, age } = req.body;
  try {
    await guestsSchema.validateAsync({ name, surname, email, age });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);

    // edge case if user with this email already registered in the event
    const [rows] = await connection.query(
      `SELECT * FROM guests WHERE email = "${email}" and event_id = ${id}`,
    );
    if (rows.length > 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        error: 'Guest with this Email already registered for the event!',
      });
    }

    // if guest with this email is not in the event guest list adds it to event
    const [response] = await connection.query('INSERT INTO guests SET ?', {
      name,
      surname,
      email,
      age,
      event_id: id,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// deleting guest from the event

router.delete('/guests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [resp] = await connection.query(
      `DELETE FROM guests WHERE id="${Number(id)}"`,
    );
    await connection.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

// updating guest info

router.patch('/guests/:id', async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, age } = req.body;
  try {
    try {
      await updateSchema.validateAsync({ name, surname, email, age });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        err,
      });
    }

    const userData = {};
    if (name) userData.name = name;
    if (surname) userData.surname = surname;
    if (email) userData.email = email;
    if (age) userData.age = age;
    const con = await mysql.createConnection(DB_CONFIG);
    const [resp] = await con.query(
      `UPDATE guests SET ? WHERE id="${Number(id)}"`,
      userData,
    );
    await con.end();
    return res.json(resp);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      err,
    });
  }
});

module.exports = router;
