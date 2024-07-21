const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

// create user
router.post('/', userController.create)

router.get('/', userController.index)
router.put('/:userId', userController.update)
router.delete('/:userId', userController.delete)

module.exports = router
