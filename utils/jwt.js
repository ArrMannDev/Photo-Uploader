const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name  , image: user.image },
    process.env.JWT_SECRET,
    { expiresIn: '48h' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken
};