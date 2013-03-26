var express = require('express'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose'),
	errors = require('./errors');

	mongoose.connect(process.env['MONGOHQ_URL']);

var base = require('./base')(mongoose);
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

app.get('/', base.controller);
// admin routes
app.all('/admin*', function(req, res, next) {
	if (req.session.user_id && req.session.is_admin) {
		next()
	} else {
		base.auth.tryAuth(req, next, function(err){
			res.render('admin/login.html', {
				error: errors.get(err),
				layout: false
			});
		})
	}
});
app.get('/admin/edit_page/:id', base.controller);
app.post('/admin/edit_page/:id', base.controller);
app.get('/admin/remove_menu/:id', base.controller);
app.post('/admin/update_menu', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
	base.controller(req, res, next);
});
app.use('/admin', base.controller);

var port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening at " + port);