const Joi = require('joi')

module.exports = {
  index: {},
  create: Joi.object({
    name: Joi.string()
      .trim()
      .required(),
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .trim()
      .required()
  }),
  update: Joi.object({
    path: {
      userId: Joi.number()
        .integer()
        .required()
    },
    body: {
      name: Joi.string().trim(),
      email: Joi.string()
        .trim()
        .email(),
      password: Joi.string().trim()
    }
  }),
  delete: Joi.object({
    params: {
      userId: Joi.string()
        .trim()
        .required()
    }
  })
}
