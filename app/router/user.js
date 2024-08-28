const express = require('express');

const router = express.Router();

const userValidator = require('../validators/user');
const { validate } = require('../validators');

const userController = require('../controllers/user');

router.post('/', validate(userValidator.create), userController.create);

router.get('/', userController.index);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

module.exports = router;
