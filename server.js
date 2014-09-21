var express = require('express'),
		bodyParser = require('body-parser'),
		morgan = require('morgan');


var port = process.env.PORT || 8080;

var app	= express();

//use middlewear
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(morgan());


require('./app/routes.js')(app);
require('./app/api.js')(app);

app.listen(port);
console.log('Now listening localhost:' + port);