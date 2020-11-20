const service = require('./service');
const model = require('./model');
const apiErrorBuilder = require('./../core/apiErrorBuilder');

async function add(req, res, next) {
  try {
    const rawData = model.fromRequest(req);
    const result = await service.add(rawData);
    res.status(201).json({ result });
  } catch (err) {
    apiErrorBuilder.errorResponseHandler(err, res, next);
  }
}

async function get(req, res, next) {
  try {
    const result = await service.get();
    res.status(200).json(result);
  } catch (err) {
    apiErrorBuilder.errorResponseHandler(err, res, next);
  }
}

async function getWithPagination(req, res, next) {
  try {
    let { filters, skip, limit } = req.query;
    const { sortField, sortOrder } = req.query;
    if (filters && filters !== 'undefined') filters = JSON.parse(filters);
    if (skip && skip !== 'undefined') skip = parseInt(skip, 10);
    if (limit && limit !== 'undefined') limit = parseInt(limit, 10);
    const result = await service.getWithPagination(filters, sortField, sortOrder, skip, limit);
    res.status(200).json(result);
  } catch (err) {
    apiErrorBuilder.errorResponseHandler(err, res, next);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await service.getById(id);
    res.status(200).json({ result });
  } catch (err) {
    apiErrorBuilder.errorResponseHandler(err, res, next);
  }
}

async function update(req, res, next) {
  try {
    const rawData = model.fromRequest(req);
    const { id } = req.params;
    const result = await service.update(id, rawData);
    res.status(200).json({ result });
  } catch (err) {
    apiErrorBuilder.errorResponseHandler(err, res, next);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await service.remove(id);
    res.status(204).json({});
  } catch (err) {
    apiErrorBuilder.errorResponseHandler(err, res, next);
  }
}


module.exports = {
  add,
  get,
  getWithPagination,
  getById,
  update,
  remove,
};