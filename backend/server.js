const express = require('express');
const cors = require('cors');
const path = require('path');
const authController = require('./controllers/authController');
const reviewController = require('./controllers/reviewController');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de autenticación
app.post('/register', authController.register);
app.post('/login', authController.login);

// Rutas de reseñas
app.post('/reviews', authenticateToken, reviewController.createReview);
app.get('/reviews/:movieId', reviewController.getReviewsByMovie);

// Ruta catch-all para SPA (opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
  console.log(`Frontend disponible en: http://localhost:${PORT}`);
});