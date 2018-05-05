// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;
var router = express.Router();

// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.get('/sample', function(req, res) {
    res.send('this is a sample!');  
});

// we'll create our routes here

// START THE SERVER



router.get('/', function(req, res) {
    res.send('im the home page!');  
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    res.send('im the about page!'); 
});
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);