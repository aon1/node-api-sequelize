const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.authenticate = (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
    const jwtToken = authorizationHeader.split(' ')[1];

    jwt.verify(jwtToken, config.auth.secretKey, (
      err,
      decoded,
    ) => {
      if (err) {
        res.json({ status: 'error', message: err.message, data: null });
      } else {
        req.user = {
          id: decoded.id,
          group: decoded.group,
        };
        next();
      }
    });
  }
};
