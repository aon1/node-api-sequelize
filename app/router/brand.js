const express = require('express');

const router = express.Router();
const brandController = require('../controllers/brand');
const { checkGrant } = require('../services/acl');

router.get('/', brandController.index);
router.post('/', checkGrant('createAny', 'brand'), brandController.create);
router.put('/:id', brandController.update);
router.delete('/:id', brandController.delete);

module.exports = router;
