var express = require('express');
var app = express();
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Result = require('./result');
var url = 'mongodb://heroku_35z39lh9:nm78jb6sj8hoqdl9sl21guor4u@ds011321.mlab.com:11321/heroku_35z39lh9';
mongoose.connect(url);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('index.html'); 
});

app.get('/script.js', function(req, res) {
    res.sendfile('script.js'); 
});
app.get('/balloon.js', function(req, res) {
    res.sendfile('balloon.js'); 
});
app.get('/uniqueToken', function(req, res) {
    var token = uuid.v4();

    Result.findOne({
        sessionToken: token   
    }, function(err, doc) {
        if(doc) {
            token = uuid.v4();
        }

        console.log('sending token');
        res.json({
            token: token 
        });
    });
});

app.post('/save', function(req, res) {
    var data = req.body;

    var newResult = new Result(data);
    newResult.save();
    res.json({
        status: 'success'  
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});
