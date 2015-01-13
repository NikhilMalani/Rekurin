var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Teach For India Wiki' });
});

/* GET Hello World page for testing. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Lesson Plan list page. */
router.get('/lplist', function(req, res) {
    var db = req.db;
    var collection = db.get('lpcollection');
    collection.find({},{},function(e,docs){
        res.render('lplist', {
            "lplist" : docs
        });
    });
});

/* GET New Lesson Plan page. */
router.get('/newlp', function(req, res) {
    res.render('newlp', { title: 'Add New Lesson Plan' });
});

/* POST to Add Lesson Plan Service */
router.post('/addlp', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    // Set our collection
    var collection = db.get('lpcollection');

    // Submit to the DB
    collection.insert({
        "title" : title,
        "description" : description,
        "author" : author
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("lplist");
            // And forward to success page
            res.redirect("lplist");
        }
    });
})

// Export the App object so that it can easily be called elsewhere in code.
module.exports = router;
