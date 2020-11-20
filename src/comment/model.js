
const BaseModel = require('../core/baseModel');

class CommentModel extends BaseModel {
  static async fromEntry(entry) {
    if (!entry) {
      return {};
    }

    return {
      id: entry.id,
      nickname: entry.nickname,
      articleId: entry.articleId,
      content: entry.content,
      createdAt: entry.createdAt
    };
  }

  static fromRequest(req) {
    const { body } = req;
    const entry = {};

    if (body.commentId === '') entry.commentId = 0;
    if (body.nickname || body.nickname === '') entry.nickname = body.nickname;
    if (body.articleId && body.articleId !== '') entry.articleId = body.articleId;
    if (body.articleId === '') entry.articleId = 0;
    if (body.commentId && body.commentId !== '') entry.commentId = body.commentId;
    if (body.commentId === '') entry.commentId = 0;
    if (body.content || body.content === '') entry.content = body.content;

    return entry;
  }
}

module.exports = CommentModel;