'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/`, (req, res) => {
  res.render(`my`);
});

router.get(`/comments`, (req, res) => {
  res.render(`comments`);
});

module.exports = router;
