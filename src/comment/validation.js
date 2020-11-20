const Joi = require('@hapi/joi');

const baseParamsSchema = {
  params: {
    id: Joi.string().alphanum(),
  },
};

const baseBodySchema = {
  nickname: Joi.string().required().allow(''),
  articleId: Joi.number(),
  content: Joi.string().required().allow(''),
  commentId: Joi.number(),
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
  getByArticleIdSchema:{
    ...baseParamsSchema,
  }
};