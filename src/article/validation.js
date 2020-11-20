const Joi = require('@hapi/joi');

const baseParamsSchema = {
  params: {
    id: Joi.string().alphanum(),
  },
};

const baseBodySchema = {
  nickname: Joi.string().required().allow(''),
  title: Joi.string().required().allow(''),
  content: Joi.string().required().allow(''),
};

module.exports = {
  addSchema: {
    body: {
      ...baseBodySchema,
    },
  },
  updateSchema: {
    ...baseParamsSchema,
    body: {
      ...baseBodySchema,
    },
  },
  deleteSchema: {
    ...baseParamsSchema,
  },
  getByIdSchema: {
    ...baseParamsSchema,
  },
};