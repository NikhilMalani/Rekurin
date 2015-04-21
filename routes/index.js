var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'REKUR.IN - Boring Shopping Automated.' });
});

/* POST to Orders Collection */
router.post('index', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var quantity = req.body.quantity;
    var product = req.body.product;
    var brand = req.body.brand;
	var frequency = req.body.frequency;
    var startDate = req.body.startDate;
    var mobile = req.body.mobile;
    var email = req.body.email;

    // Set our collection
    var collection = db.get('orderscollection');

    // Submit to the DB
    collection.insert({
        "quantity" : quantity,
        "product" : product,
        "brand" : brand,
        "frequency" : frequency,
        "startDate" : startDate,
        "mobile" : mobile,
        "email" : email
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the order information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/thankyou");
            // And forward to success page
            res.redirect("/thankyou");
        }
    });
})

// Export the App object so that it can easily be called elsewhere in code.
module.exports = router;
