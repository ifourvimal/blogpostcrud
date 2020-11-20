const model = require('./model.js');
const repo = require('./repo.js');

async function add(data) {
  const entry = await repo.add(data);
  return model.fromEntry(entry);
}

async function get() {
  let entries = await repo.getAll({});
  entries = await model.fromEntries(entries);
  return entries;
}

async function getWithPagination(page, limit) {
  const entries = await repo.lazyLoadList({ page, limit });
  const result = await model.fromEntries(entries.result);
  entries.result = result;
  return entries;
}

async function getById(id) {
  const entry = await repo.exists(id);  return model.contentOnly(entry);
}

async function update(id, data) {
  const entry = await repo.update(id, data);
  return model.fromEntry(entry);
}

async function remove(id) {
  await repo.remove(id);
}

module.exports = {
  add,
  get,
  getWithPagination,
  getById,
  update,
  remove,
};
