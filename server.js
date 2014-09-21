var express = require('express'),
		bodyParser = require('body-parser'),
		morgan = require('morgan');


var port = 9929;
var host = '10.21.55.31'
var app	= express();

//use middlewear
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(morgan());


require('./app/routes.js')(app);
require('./app/api.js')(app, express);


app.listen(port, host);
console.log('Now listening ' + host + ':' + port);