const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ redirectTo: '/login' });
  }
  const token = authHeader.split(' ')[1];
  try {
    decodedToken = jwt.verify(token, 'roamridersecretpowerproject');
  } catch (err) {
    err.statusCode = 500;
    return res.status(401).json({ redirectTo: '/login' });
  }
  if (!decodedToken) {
    return res.status(401).json({ redirectTo: '/login' });
  }
  req.userID = decodedToken.userID;
  next();
};
