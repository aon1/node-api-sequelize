const express = require('express')
const router = express.Router()
const services = require('../services/auth')

const user = require('./user')
const brand = require('./brand')
const auth = require('./auth')
const word = require('./word')

router.use('/words', word)

router.use('/login', auth)
router.use('/signup', user)
router.use('/users', services.authenticate, user)
router.use('/brands', services.authenticate, brand)

module.exports = router
