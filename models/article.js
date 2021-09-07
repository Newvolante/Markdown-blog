const mongoose = require('mongoose');
// compiler for parsing markdown without caching or blocking for long periods of time
const marked = require('marked');
// generates user friendly URL's
const slugify = require('slugify');
// library to sanitize HTML (so it can't run JS code)
const createDomPurify = require ('dompurify');
// renders HTML into node.js
const { JSDOM } = require('jsdom');
// creates HTML and purifies it
const dompurify = createDomPurify(new JSDOM().window);

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
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

// runs everytime we call the database
articleSchema.pre('validate', function(next) {
  if(this.title) {
    this.slug = slugify(this.title, {
      // setting the slug to lowercase
      lower: true,
      // gets rid of characters not fitting in the url
      strict: true
    })
  }

  if (this.markdown) {
    // dompurify.sanitize() sanitizes the html from the markdown
    // marked() converts markdown to sanitized html
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }

  next();
})

// in this case Article is the schema of the collection of documents
module.exports = mongoose.model('Article', articleSchema);