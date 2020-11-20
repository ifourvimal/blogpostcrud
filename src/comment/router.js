const express = require('express');

const baseValidation = require('./../core/baseValidation');
const validation = require('./validation');
const controller = require('./controller');

const router = express.Router();

router.post(
  '/comments',
  baseValidation(validation.addSchema),
  controller.add,
);

router.get(
  '/comments',
  controller.get,
);

router.get(
  '/comments/with-pagination',
  controller.getWithPagination,
);

router.get(
  '/comments/:id',
  baseValidation(validation.getByIdSchema),
  controller.getById,
);

router.get(
  '/comments/article/:id',
  baseValidation(validation.getByArticleIdSchema),
  controller.getByArticleId,
);

router.put(
  '/comments/:id',
  baseValidation(validation.updateSchema),
  controller.update,
);

router.delete(
  '/comments/:id',
  baseValidation(validation.deleteSchema),
  controller.remove,
);

module.exports = router;