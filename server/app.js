var express = require('express');
var app = new express();
var bodyParser = require('body-parser')

app.use('/building/chainreaction', express.static('./static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../client/templates');
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.redirect('/building/chainreaction')
});

app.get('/building/chainreaction', function(req, res) {
    res.render(__dirname + '/../client/index.ejs');
});

app.listen(3005);