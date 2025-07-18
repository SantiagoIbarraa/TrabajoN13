const db = require('../models/db');

exports.createReview = async (req, res) => {
  const { movie_id, rating, comment } = req.body;
  const user_id = req.user.id;
  if (!movie_id || !rating || !comment) return res.status(400).json({ error: 'Faltan campos' });
  try {
    await db.query('INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES (?, ?, ?, ?)', [user_id, movie_id, rating, comment]);
    res.status(201).json({ message: 'Reseña guardada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar reseña' });
  }
};

exports.getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const [reviews] = await db.query('SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_id = ?', [movieId]);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
}; 