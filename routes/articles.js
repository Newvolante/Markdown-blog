const express = require('express');
// importing the model for the mongoDB database
const Article = require('./../models/article');
const router = express.Router();

// manages /articles/new
router.get('/new', (req, res) => {
  // renders the the new.ejs view
  res.render('articles/new');
})

// called when submitting the form for a new article from the new.ejs view
router.post('/', (req, res) => {

});

module.exports = router;
