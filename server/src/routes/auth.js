const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../../config');

const router = express.Router();

const regSchema = joi.object({
  userName: joi.string().required().min(4),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});
// REGISTER
router.post('/register', async (req, res) => {
  const { user_name: userName, email, password } = req.body;
  try {
    await regSchema.validateAsync({ userName, email, password });
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    if (rows.length > 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        error: 'User with this Email already exists!',
      });
    }
    const [response] = await connection.query('INSERT INTO users SET ?', {
      user_name: userName,
      email,
      password: hashedPassword,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await loginSchema.validateAsync({ email, password });
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [user] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    await connection.end();
    // checking if user exist
    if (user.length === 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        error: 'User with this email not found!',
      });
    }
    // decrypting and checking if passwords match
    const compare = await bcrypt.compare(password, user[0].password);
    if (!compare) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'Password is incorrect!' });
    }
    // Assigning JWT
    const token = jwt.sign(
      {
        id: user[0].id,
        name: user[0].full_name,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      user: {
        id: user[0].id,
        name: user[0].user_name,
        created_at: user[0].created_at,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
