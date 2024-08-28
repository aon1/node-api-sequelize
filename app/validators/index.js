const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

exports.validate = schema => (req, res, next) => {
  const { error } = schema.validate(req.body, options);
  if (error) {
    res.status(422).send({ message: error.details.map(x => x.message).join(', ') });
  } else {
    next();
  }
};
