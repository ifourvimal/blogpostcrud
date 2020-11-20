const model = require('./model.js');
const repo = require('./repo.js');
const articleRepo = require('./../article/repo');
const articleModel = require('../article/model');

async function add(data) {
  const entry = await repo.add(data);
  return model.fromEntry(entry);
}

async function get() {
  let entries = await repo.getAll({});
  const result = [];
  if(entries.length > 0) {
    for(let i=0; i< entries.length; i+=1) { 
		const article = await articleModel.fromEntry(entries[i].Article);
      const comment = await model.fromEntry(entries[i]);
      result.push(Object.assign({}, comment, {article}, ));
    }
    entries = result;
  }
  return entries;
}

async function getWithPagination(page, limit) {
  const entries = await repo.lazyLoadList({ page, limit });
  const result = [];
  for(let i=0; i< entries.result.length; i+=1) { 
		const article = await articleModel.fromEntry(entries.result[i].Article);
    const comment = await model.fromEntry(entries.result[i]);
    result.push(Object.assign({}, comment, {article}, ));
  }
  entries.result = result;
  return entries;
}

async function getById(id) {
  const entry = await repo.exists(id);
	const article = await articleModel.fromEntry(entry.Article);
  const comment = await model.fromEntry(entry);
  const result = [];
  result.push(Object.assign({}, comment, {article}, ));
  return result;
}

async function update(id, data) {
  const entry = await repo.update(id, data);
  return model.fromEntry(entry);
}

async function remove(id) {
  await repo.remove(id);
}

async function getByArticleId(id) {
  await articleRepo.exists(id);
  const comments = await repo.get({articleId: id});
	const article = await model.fromEntry(comments);
  const comment = await model.fromEntry(comments);
  const result = [];
  result.push(Object.assign({}, comment, {article}, ));
  return result;
}

module.exports = {
  add,
  get,
  getWithPagination,
  getById,
  update,
  remove,
  getByArticleId
};
