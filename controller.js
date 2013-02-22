exports.init = function(models) {
	var models = models;
	var base = {
		init: function(req, res, next){
			this.req = req;
			this.res = res;
			this.next = next;
			this.url = this.req._parsedUrl;
			this.post = req.body;
			this.doController();
		},
		doController: function(){
			path = this.url.pathname.split('/');
			var controller = (path.length == 1 || !path[1]?'index':path[1]);
			var action = (path.length == 2?'index':path[2]);
			eval(controller+'Controller.'+action+'Action()');
		},
		render: function(path, opts){
			opts['curr_page'] = this.req.originalUrl;
			this.res.render(path, opts);
		}
	}

	var indexController = {
		path: '',
		indexAction: function() {
			this.render('index');
		},
		render: function(name, opts) {
			if (!opts) opts = {}
			base.render(this.path+name+'.html', opts)
		}
	}

	var adminController = {
		path: 'admin/',
		layout: 'admin_layout.html',
		indexAction: function() {
			this.render('index');
		},
		pagesAction: function() {
			console.log(base.post);
			this.render('pages');
		},
		productsAction: function() {
			this.render('index');
		},
		ordersAction: function() {
			this.render('index');
		},
		render: function(name, opts) {
			if (!opts) opts = {}
			opts['layout'] = this.layout;
			base.render(this.path+name+'.html', opts)
		}
	}

	return function(req, res, next) {
		base.init(req, res, next);
	};
}

