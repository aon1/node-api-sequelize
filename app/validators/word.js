const Joi = require('joi')

module.exports = {
  index: {},
  create: {
    body: {
      word: Joi.string()
        .trim()
        .required()
    }
  }
}
