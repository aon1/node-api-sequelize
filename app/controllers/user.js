const { User } = require('../models');
const logger = require('../../logger');
const { AccessControl } = require('accesscontrol');

exports.index = (req, res) => User.findAll()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    res.status(500).json({ status: 500, message: error });
  });

exports.create = (req, res) => {
  // const ac = new AccessControl(grants);
  const data = req.body;

  return User.create(data)
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
  const { userId } = req.params;

  return User.update(data, { where: { id: userId }, individualHooks: true })
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
  const { userId } = req.params;

  return User.destroy({ where: { id: userId } })
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
