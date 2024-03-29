"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../constants`);

const {
  articleValidator,
  articleExist,
  articleCommentExist,
  articleCommentValidator,
} = require(`../middlewares`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const { offset, limit, comments } = req.query;
    let articles;
    if (limit || offset) {
      articles = await articleService.findPage({ limit, offset, comments });
    } else {
      articles = await articleService.findAll(comments);
    }
    res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, articleExist(articleService), async (req, res) => {
    const { article } = res.locals;
    res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const article = await articleService.create(req.body);
    res.status(HttpCode.CREATED).json(article);
  });

  route.put(
    `/:articleId`,
    articleExist(articleService),
    articleValidator,
    async (req, res) => {
      const id = req.params.articleId;
      const isUpdated = await articleService.update(id, req.body);

      res.status(HttpCode.OK).json(isUpdated);
    }
  );

  route.delete(
    `/:articleId`,
    articleExist(articleService),
    async (req, res) => {
      const { article } = res.locals;
      const articleIdDeleted = await articleService.drop(article.id);
      res.status(HttpCode.OK).send(articleIdDeleted);
    }
  );

  route.get(
    `/:articleId/comments`,
    articleExist(articleService),
    async (req, res) => {
      const { article } = res.locals;
      const comments = await commentService.findAll(article.id);
      res.status(HttpCode.OK).json(comments);
    }
  );

  route.delete(
    `/:articleId/comments/:commentId`,
    [articleExist(articleService), articleCommentExist],
    async (req, res) => {
      let result;
      const { article, comment } = res.locals;
      result = await commentService.drop(comment.id);

      res.status(HttpCode.OK).send(result);
    }
  );

  route.post(
    `/:articleId/comments`,
    [articleExist(articleService), articleCommentValidator],
    async (req, res) => {
      const { article } = res.locals;

      const comment = await commentService.create(article.id, req.body);

      res.status(HttpCode.CREATED).json(comment);
    }
  );
};
