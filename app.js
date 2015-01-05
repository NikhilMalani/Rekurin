var express = require('express');
var stormpath = require('express-stormpath');
var ArticleProvider = require('./articleProvider-memory').ArticleProvider;

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: 'C:/Users/User/Desktop/TeachFor India/tfi2/apiKey-4FKXVNLGK3FSC9Y4Q4SNBJAH6.properties',
  application: 'https://api.stormpath.com/v1/applications/4vokpim3RweQMHqP6PNCeN',
  secretKey: 'SOMERANDOMSTRINGTHATISLONGANDCONFUSING',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

var articleProvider= new ArticleProvider();

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Teach For India Wiki'
  });
});

app.get('/browse', function(req, res){
  articleProvider.findAll(function(error, docs){
    res.render('browse.jade', { locals: {
		title: 'Browse Lesson Plans',
		articles:docs
		}
	});
  })
});

app.get('/lessonplan', function(req, res) {
  res.render('lessonplan', {
    title: 'Create Lesson Plan'
  });
});

app.post('/lessonplan', function(req, res){
    articleProvider.save({
        lpTitle: req.param('lpTitle'),
        description: req.param('description'),
		author: req.param('author')
    }, function( error, docs) {
        res.redirect('/')
    });
});

app.use('/profile',require('./profile')());

app.listen(3000);