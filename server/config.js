const DB_CONFIG = {
  host: 'localhost',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

module.exports = DB_CONFIG;
