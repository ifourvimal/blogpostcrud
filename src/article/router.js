const express = require('express');

const baseValidation = require('./../core/baseValidation');
const validation = require('./validation');
const controller = require('./controller');

const router = express.Router();

router.post(
  '/articles',
  baseValidation(validation.addSchema),
  controller.add,
);

router.get(
  '/articles',
  controller.get,
);

router.get(
  '/articles/with-pagination',
  controller.getWithPagination,
);

router.get(
  '/articles/:id',
  baseValidation(validation.getByIdSchema),
  controller.getById,
);

router.put(
  '/articles/:id',
  baseValidation(validation.updateSchema),
  controller.update,
);

router.delete(
  '/articles/:id',
  baseValidation(validation.deleteSchema),
  controller.remove,
);

module.exports = router;