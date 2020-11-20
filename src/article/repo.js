const Sequelize = require('sequelize');

const { Op } = Sequelize;

const sequelize = require('../util/database');
const apiError = require('../core/apiErrorBuilder');

const Article = sequelize.define('article', {  
  nickname: {
    type: Sequelize.STRING,
    allowNull: false  },
  title: {
    type: Sequelize.STRING,
    allowNull: false  },
  content: {
    type: Sequelize.STRING,
    allowNull: false  },
});

function exists(id) {
  return Article.findByPk(id);
}

function get(conditions) {
  return Article.findOne({where:  conditions});
}

function getAll(conditions) {
  return Article.findAll(conditions);
}

function add(data) {
  try {
    return Article.create(data);
  } catch (error) {
    throw error;
  }
}

async function lazyLoadList({ page = 0, limit = 50 } = {}) {
  
  const options = {
    // offset:((page-1)*limit),
    limit,
  };

  const total = await Article.count({});
  
  return Article.findAll(options).then(result => {
    return {result, total};
  }).catch(err =>{
    console.log(err);
  });
}

async function update(id, data) {
  if (await exists(id)) {
    let articleData = await Article.findByPk(id);
    let article = Object.assign(articleData, data);
    return article.save();
  }
  throw apiError.articleNotFound();
}

async function remove(id) {
  if (await exists(id)) {
    return Article.destroy({where: {id: id}});
  }
  throw apiError.articleNotFound();
}

module.exports = {
  Article,
  get,
  getAll,
  add,
  lazyLoadList,
  exists,
  update,
  remove,
};