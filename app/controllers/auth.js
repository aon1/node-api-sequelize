const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const rTracer = require('cls-rtracer')

const { User } = require('../models')

module.exports = {
  login (req, res, next) {
    return User.findOne({ where: { email: req.body.email } }).then(userInfo => {
      console.log(req)
      console.log(rTracer.id())
      if (userInfo) {
        if (userInfo.validPassword(req.body.password)) {
          const token = jwt.sign({ id: userInfo.id }, config.auth.secretKey, {
            expiresIn: '24h'
          })
          res.json({
            status: 'success',
            message: 'user found!!!',
            data: { user: userInfo, token }
          })
        } else {
          res.json({
            status: 'error',
            message: 'Invalid email/password!!!',
            data: null
          })
        }
      }
    })
  }
}
