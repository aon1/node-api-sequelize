const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const logger = require('../../logger');
const config = require('../../config/config');

exports.index = (req, res) => {
  try {
    const admins = Admin.findAll();
    if (admins) {
      res.status(200).json(admins);
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

exports.login = async (req, res) => {
  const admin = await Admin.findOne({ where: { email: req.body.email } });
  if (admin) {
    if (admin.validatePassword(req.body.password, admin.password)) {
      const token = jwt.sign({
        id: admin.id,
        group: 'admin',
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

exports.create = (req, res) => {
  // const ac = new AccessControl(grants);
  const data = req.body;

  return Admin.create(data)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: 'Client created',
        data: { user: user.id },
      });
    })
    .catch((error) => {
      logger.error('Error on creating client', error);
      res.status(500).json({ message: 'Error on creating user' });
    });
};

exports.update = (req, res) => {
  const data = req.body;
  const { id } = req.params;

  return Admin.update(data, { where: { id }, individualHooks: true })
    .then((result) => {
      res.status(200).json({ status: 200, message: 'User updated' });
    })
    .catch((error) => {
      logger.error('Error on updating User', error);
      res
        .status(500)
        .json({ status: 500, message: 'Error on updating User' });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  return Admin.destroy({ where: { id } })
    .then((affectedRows) => {
      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ status: 404, message: 'User not found' });
      } if (affectedRows === 1) {
        return res.status(200).json({ status: 200, message: 'User deleted' });
      }
      return Promise.reject(
        new Error('Unexpected error. Wront ammount deletion of User'),
      );
    })
    .catch((error) => {
      logger.error('Error on deleting User', error);
      res
        .status(500)
        .json({ status: 500, message: 'Error on deleting User' });
    });
};
