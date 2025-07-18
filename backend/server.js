const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const authController = require('./controllers/authController');
const reviewController = require('./controllers/reviewController');
const authenticateToken = require('./middleware/authenticateToken');

// Cargar variables de entorno desde .env si existe
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root', // Cambia por tu usuario de MySQL
  password: '', // Cambia por tu contraseña de MySQL
  database: 'movie_reviews_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de autenticación
app.post('/register', authController.register); // Sugerencia: Mejorar validaciones en el controlador
app.post('/login', authController.login);       // Sugerencia: Mejorar mensajes de error y uso de JWT_SECRET

// Rutas de reseñas
app.post('/reviews', authenticateToken, reviewController.createReview); // Sugerencia: Validar rating y unicidad
app.get('/reviews/:movieId', reviewController.getReviewsByMovie);

// Ruta de salud para chequeo de estado
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Ruta catch-all para SPA (opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
  console.log(`Frontend disponible en: http://localhost:${PORT}`);
});