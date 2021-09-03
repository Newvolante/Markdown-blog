const express = require('express');
// requiring the mongoose library (database)
const mongoose = require('mongoose');
//importing the schema of the mongo database
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const app = express();
const PORT = 5000;

// connecting to local mongodb database
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, // following deprecation warnings
  useUnifiedTopology: true, // following deprecation warnings
  useCreateIndex: true // following deprecation warnings
});

// setting the view engine
app.set('view engine', 'ejs'); // writing views in ejs
// the first parameter converts views in html

// telling express how to access the fields in the _form_fields view
// used to create and edit articles
app.use(express.urlencoded({ 
  extended: false
}));


// root route
app.get('/', async (req, res, next) => {
  //rendering the articles in the database
  const articles = await Article
    .find()
    .sort({ createdAt: "desc"});   // sorting in descending order

  // rendering the root view ('index.ejs') from the views folder
  // passing an obj to show all the articles
  res.render('articles/index', {
    articles: articles
  });
})

// articles route
app.use('/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});