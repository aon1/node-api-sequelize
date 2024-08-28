const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string()
    .trim()
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .required(),
  password: Joi.string()
    .trim()
    .required(),
});
