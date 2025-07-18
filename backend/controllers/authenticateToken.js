const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_secreto_jwt_super_seguro'; // Debe ser el mismo secreto que en server.js

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

    if (token == null) {
        return res.sendStatus(401); // No hay token
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token no es válido
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;