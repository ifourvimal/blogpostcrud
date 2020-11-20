
const BaseModel = require('../core/baseModel');

class ArticleModel extends BaseModel {
  static async fromEntry(entry) {
    if (!entry) {
      return {};
    }

    return {
      id: entry.id,
      articleId: entry.articleId,
      nickname: entry.nickname,
      title: entry.title,
      content: entry.content,
      createdAt: entry.createdAt
    };
  }

  static async contentOnly(entry) {
    if (!entry) {
      return {};
    }

    return {
      content: entry.content,
    };
  }

  static fromRequest(req) {
    const { body } = req;
    const entry = {};

    if (body.articleId && body.articleId !== '') entry.articleId = body.articleId;
    if (body.articleId === '') entry.articleId = 0;
    if (body.nickname || body.nickname === '') entry.nickname = body.nickname;
    if (body.title || body.title === '') entry.title = body.title;
    if (body.content || body.content === '') entry.content = body.content;

    return entry;
  }
}

module.exports = ArticleModel;