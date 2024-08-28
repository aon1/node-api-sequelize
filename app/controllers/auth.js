const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const { User } = require('../models');

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    if (user.validatePassword(req.body.password, user.password)) {
      const token = jwt.sign({
        id: user.id,
        group: 'user',
      },
      config.auth.secretKey, {
        expiresIn: '240h',
      });

      res.json({ token });
    } else {
      res.json({
        status: 'error',
        message: 'Invalid email/password',
      });
    }
  }
};
