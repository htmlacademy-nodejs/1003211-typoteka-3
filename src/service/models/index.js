'use strict'

const {DataTypes, Model} = require(`sequelize`);

const Aliase = require(`./aliase`);

const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);

class ArticleCategory extends Model {}


const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreingKey: `article_id`});
  Comment.belongsTo(Article, {foreingKey: `article_id`});

  ArticleCategory.init({
    ArticleId: {
      field: `article_id`,
      type: DataTypes.INTEGER
    },
    CategoryId: {
      field: `category_id`,
      type: DataTypes.INTEGER
    }
  }, {
    modelName: `ArticleCategory`,
    tableName: Aliase.ARTICLE_CATEGORIES,
    sequelize
  })
  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES})
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});
  
  return {Category, Comment, ArticleCategory, Article};
}

module.exports = define;
