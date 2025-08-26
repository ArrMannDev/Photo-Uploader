const jwt = require('../utils/jwt');

module.exports = async function (req, res, next) {
  const token = req.cookies.authToken;
//   console.log(token);
  if (!token) return res.redirect('/');

  try {
    const user = await jwt.verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.redirect('/');
  }
};