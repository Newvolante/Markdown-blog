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
  res.render('articles/new', { article: new Article() });
})

// whenever requesting ./articles/"something"
// and it's not ./articles/new
router.get('/:id', (req, res) => {

});

// called when submitting the form for a new article from the new.ejs view
router.post('/', async (req, res) => {  // this is an asynchronous request
  // creating a new article
  const article = new Article ({
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
    res.redirect(`/articles/${article.id}`)
  } catch(e) {
    // in case of error, prefilling _form_fields.ejs
    // with info entered previously
    res.render('articles/new', { article: article });
  }
  
});

module.exports = router;
