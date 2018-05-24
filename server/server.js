console.log('Hello server-book');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Contact} = require('./models/contact');
var configFile = require("./config/config.json");

var app = express();
const port = process.env.PORT || 3000;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(bodyParser.json());
  
// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);
  
// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    console.log('entering');
    res.json({
        message: 'Welcome to my book api!',
        textName: 'My name is Mohamed Alachbili, I am from Morocco',
        textJob: 'and I am a Fullstack Web Developer',
    });
});

// get config file (accessed at GET http://localhost:3000/getconfig)
router.get('/getconfig', function(req, res) {
    console.log('getting config...');
    //var config = fetchConfigFile();
    //console.log(JSON.stringify(configFile));
    res.json(configFile);
});
  

router.post('/contact', (req, res) => {
    console.log('Hello post contact');
    var contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      text: req.body.text,
      submitedAt: new Date(Date.now()).toISOString()
    });
    contact.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});
  
// START THE SERVER
app.listen(port, () => {
    console.log(`Magic happens on port ${port}`);
});
  
  module.exports = {app}; // to send app server.test.js