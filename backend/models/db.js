const mysql = require('mysql2/promise');
const path = require('path');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Cambiar según tu configuración de XAMPP
  database: 'movie_reviews_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db; 