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
router.post('/', async (req, res) => {  // this is an asynchronous request
  // creating a new article
  let article = new Article ({
    // req.body.___ works thanks to using
    // app.use(express.urlencoded( {extended: false })); in server.js
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
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
    console.log(e);
    res.render('articles/new', { article: article });
  }
  
});

// to delete articles from the database
router.delete('/:id', async (req, res) => {
  
  //deleting the matching article
  await Article.findByIdAndDelete(req.params.id);
  // redirecting to the root
  res.redirect('/');
});

module.exports = router;
