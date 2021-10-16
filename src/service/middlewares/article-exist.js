"use strict";

const { HttpCode } = require(`../constants`);

module.exports = (articleService) => async (req, res, next) => {
  const { articleId } = req.params;
  const { comments } = req.query;

  const article = await articleService.findOne(articleId, comments);

  if (!article) {
    res.status(HttpCode.NOT_FOUND).send(`Article with ${articleId} not found`);
    return null;
  }

  res.locals.article = article;

  return next();
};
