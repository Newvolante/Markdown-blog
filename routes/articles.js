const express = require('express');
// importing the model for the mongoDB database
const Article = require('./../models/article');
const router = express.Router();

// manages /articles/new
router.get('/new', (req, res) => {
  // 1 - renders the the new.ejs view
  // 2 - passing a new article as a property makes it work when
  // 2 - you exit the filled new article page without sending it
  // 2 - and you go back to it
  // 3 - the second parameter passes in a new blank article every
  // 3 - time the "new" route is requested
  res.render('articles/new', { article: new Article() });
})

// edit route
router.get('/edit/:id', async (req, res) => {
  // retrieving the article
  const article = await Article.findById(req.params.id);
  // rendering the edit view
  res.render('articles/edit', { article: article });
})

// 1 - whenever requesting ./articles/"something"
// 1 - and it's not ./articles/new
// 2 - showing the requested blog article
router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({
    slug: req.params.slug
  });
  if (article == null) res.redirect('/');   // if no article with such id is found
  res.render('articles/show', {article: article });
});

// called when submitting the form for a new article from the new.ejs view
router.post('/', async (req, res, next) => {  // this is an asynchronous request
  req.article = new Article();
  // next() allows to call saveArticleAndRedirect()
  next();
}, saveArticleAndRedirect('new'));

// called when editing an article
router.put('/:id', async (req, res, next) => {  // this is an asynchronous request
  req.article = await Article.findById(req.params.id);
  // next() allows to call saveArticleAndRedirect()
  next();
}, saveArticleAndRedirect('edit'));

// to delete articles from the database
router.delete('/:id', async (req, res) => {
  
  //deleting the matching article
  await Article.findByIdAndDelete(req.params.id);
  // redirecting to the root
  res.redirect('/');
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    // req.body.___ works thanks to using
    // app.use(express.urlencoded( {extended: false })); in server.js
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    // saves the article to the database
    try {
      // if successfull, updating the article var
      // with the new saved article
      article = await article.save(); // this is returning an id
      // redirecting the user to the new article
      res.redirect(`/articles/${article.slug}`)
    } catch(e) {
      // in case of error, prefilling _form_fields.ejs
      // with info entered previously
      res.render(`articles/${path}`, { article: article });
    }
  }
}

module.exports = router;
