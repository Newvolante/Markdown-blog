const mongoose = require('mongoose');

// all the columns of the articles
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now   // no parentheses - called whenever we create a document
  }
});

// in this case Article is the schema of the collection of documents
module.exports = mongoose.model('Article', articleSchema);