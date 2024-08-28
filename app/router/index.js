const express = require('express');

const router = express.Router();
const services = require('../services/auth');

const user = require('./user');
const brand = require('./brand');
const auth = require('./auth');
const admin = require('./admin');

router.use('/login', auth);
router.use('/signup', user);
router.use('/admin', admin);
// router.use('/users', services.authenticate, user)
router.use('/users', user);
router.use('/brands', services.authenticate, brand);

module.exports = router;
