var express = require('express'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose'),
	errors = require('./errors');
  
mongoose.connect('mongodb://heroku:f7c6312f4eb2821e529212f0c8d58735@linus.mongohq.com:10010/app11805677'); // mongoose.connect(process.env['MONGOHQ_URL']);

var schema = require('./schema').init(mongoose),
	models = require('./model').init(mongoose, schema),
	auth = require('./auth').init(models.users),
	controller = require('./controller').init(models),
	app = express();


app.configure(function(){
	app.engine('html', require('uinexpress').__express) // Используем функцию "template" библиотеки underscore для рендеринга
	app.set('port', process.env.PORT || 5000);
	app.set('view engine', 'html')
	app.set('views', __dirname + "/tpl");
	app.set("view options", {layout: 'layout.html'});
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('abez'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
	app.use(express.errorHandler()); // ONLY FOR DEVELOPMENT
});

// admin routes
app.all('/admin*', function(req, res, next) {
	if (req.session.user_id && req.session.is_admin) {
		next()
	} else {
		auth.tryAuth(req, next, function(err){
			res.render('admin/login.html', {
				error: errors.get(err),
				layout: false
			});
		})
	}
});

app.get('/', controller);
app.use('/admin', controller);

var port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening at " + port);