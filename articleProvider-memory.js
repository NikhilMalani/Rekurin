// var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
// var Server = require('mongodb').Server;
// var BSON = require('mongodb').BSON;
// var ObjectID = require('mongodb').ObjectID;
// var uri = "mongodb://heroku_app32974403:dupj17gf5hd71sh61thoh3nsui@ds031271.mongolab.com:31271/heroku_app32974403";

// ArticleProvider = function(host, port) {
  // this.db= new Db(uri);
  // this.db.open(function(){});
// };


// ArticleProvider.prototype.getCollection= function(callback) {
  // this.db.collection('articles', function(error, article_collection) {
    // if( error ) callback(error);
    // else callback(null, article_collection);
  // });
// };

// ArticleProvider.prototype.findAll = function(callback) {
    // this.getCollection(function(error, article_collection) {
      // if( error ) callback(error)
      // else {
        // article_collection.find().toArray(function(error, results) {
          // if( error ) callback(error)
          // else callback(null, results)
        // });
      // }
    // });
// };

var articleCounter = 1;

ArticleProvider = function(){};
ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

ArticleProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

ArticleProvider.prototype.save = function(articles, callback) {
  var article = null;

  if( typeof(articles.length)=="undefined")
    articles = [articles];

  for( var i =0;i< articles.length;i++ ) {
    article = articles[i];
    article._id = articleCounter++;
    article.created_at = new Date();

    if( article.comments === undefined )
      article.comments = [];

    for(var j =0;j< article.comments.length; j++) {
      article.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length]= article;
  }
  callback(null, articles);
};

/* Lets bootstrap with dummy data */
new ArticleProvider().save([
  {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
  {title: 'Post two', body: 'Body two'},
  {title: 'Post three', body: 'Body three'}
], function(error, articles){});

exports.ArticleProvider = ArticleProvider;