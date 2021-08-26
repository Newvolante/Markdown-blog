const express = require('express');
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
