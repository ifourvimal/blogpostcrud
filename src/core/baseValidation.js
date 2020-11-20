const Joi = require('@hapi/joi');

module.exports = function validate(schema) {
  return (req, res, next) => {
    const result = Joi.validate(req, schema, {
      allowUnknown: true,
      abortEarly: false,
    });
    if (result.error) {
      const errors = result.error.details.map(e => ({
        location: e.path[0],
        param: e.context.label,
        msg: e.message,
        type: e.type === 'any.required' || e.type === 'any.empty'
          ? 'REQUIRED' : 'INVALID',
      }));
      return res.status(400).json({ errors });
    }
    return next();
  };
};
