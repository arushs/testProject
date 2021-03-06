var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes/main')
var mongoose = require('mongoose');
var dbURL = 'mongodb://heroku_app23833525:st89vkfa981rl4ahenpr6v2l6@ds049237.mongolab.com:49237/heroku_app23833525';
var mongoUser = require('./models/user');

mongoose.connect(dbURL);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/signup', routes.signup);
app.get('/explore', routes.explore);
app.get('/signup/confirm', routes.signup_confirm);
app.get('/signup/error', routes.signup_error);
app.get('/badlogin', routes.bad_login);
app.get('/success', routes.success);
app.post('/new-user', routes.new_user);
app.post('/login-attempt', routes.check_login);
app.post('/my_report', routes.my_report);

//Starting the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server listening on port ' + app.get('port'));
});
