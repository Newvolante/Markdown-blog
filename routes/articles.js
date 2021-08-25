const express = require('express');
const router = express.Router();

// manages /articles/new
router.get('/new', (req, res) => {
    // renders the the new.ejs view
    res.render('articles/new');
})

module.exports = router;