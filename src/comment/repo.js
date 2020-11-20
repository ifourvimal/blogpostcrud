const Sequelize = require('sequelize');

const { Op } = Sequelize;

const sequelize = require('../util/database');
const apiError = require('../core/apiErrorBuilder');
const { Article } = require('../article/repo');

const Comment = sequelize.define('comment', { 
  nickname: {
    type: Sequelize.STRING,
    allowNull: false  },
  articleId: {
    type: Sequelize.INTEGER,
    allowNull: true  },
  content: {
    type: Sequelize.STRING,
    allowNull: false  },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: true  },
});

Article.hasOne(Comment, {as: 'Article', foreignKey: 'articleId', onDelete: 'cascade'});

Comment.belongsTo(Article, {as: 'Article', foreignKey: 'articleId', onDelete: 'cascade'});

Comment.hasMany(Comment, {as: 'Comment', foreignKey: 'commentId', onDelete: 'cascade'});

// Comment.belongsTo(Comment, {as: 'Comment', foreignKey: 'commentId', onDelete: 'cascade'});

function exists(id) {
  return Comment.findByPk(id, { 
		include: ['Article'] } );
}

function get(conditions) {
  return Comment.findOne({where:  conditions});
}

function getAll(conditions) {
  return Comment.findAll(conditions);
}

function add(data) {
  try {
    return Comment.create(data);
  } catch (error) {
    throw error;
  }
}

async function lazyLoadList({ page = 0, limit = 50 } = {}) {

  const options = {
    offset:((page-1)*limit),
    limit,
  };

  const total = await Comment.count({});
  
  return Comment.findAll(options).then(result => {
    return {result, total};
  });
}

async function update(id, data) {
  if (await exists(id)) {
    let commentData = await Comment.findByPk(id);
    let comment = Object.assign(commentData, data);
    return comment.save();
  }
  throw apiError.commentNotFound();
}

async function remove(id) {
  if (await exists(id)) {
    return Comment.destroy({where: {id: id}});
  }
  throw apiError.commentNotFound();
}

module.exports = {
  Comment,
  get,
  getAll,
  add,
  lazyLoadList,
  exists,
  update,
  remove,
};