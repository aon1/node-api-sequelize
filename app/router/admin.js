const express = require('express');

const router = express.Router();

const adminValidator = require('../validators/admin');
const { validate } = require('../validators');

const adminController = require('../controllers/admin');

router.post('/', validate(adminValidator.create), adminController.create);
router.post('/login', adminController.login);
router.get('/', adminController.index);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);

module.exports = router;
