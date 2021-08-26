const express = require('express');
// requiring the mongoose library (database)
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const app = express();
const PORT = 5000;

// connecting to local mongodb database
mongoose.connect('mongodb://localhost/blog', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

// setting the view engine
app.set('view engine', 'ejs'); // writing views in ejs
                               // the first parameter converts views in html

// articles route
app.use('/articles', articleRouter);

// root route
app.get('/', (req, res, next) => {

  // obj containing all the articles
  const articles = [{
      title: 'Test article',
      createdAt: new Date(),
      description: 'Test description'
    },
    {
      title: 'Test article 2',
      createdAt: new Date(),
      description: 'Test description 2'
    },
    {
      title: 'Test article 3',
      createdAt: new Date(),
      description: 'Test description 3'
    }
  ];
  
  // rendering the root view ('index.ejs') from the views folder
  // passing an obj to show all the articles
  res.render('articles/index', {
    articles: articles
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});