const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ "error": "Token not provided." });

  const [scheme, token] = authHeader.split(' ');

  if (!scheme || !token) return res.status(401).json({ "error": "Token error." });

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ "error": "Token malformatted." });

  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    if (err) return res.status(401).json({ "error": "Invalid token." });

    req.userId = decoded.id;

    return next();
  });
};