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
			var path = this.url.pathname.split('/');
			var controller = (path.length == 1 || !path[1]?'index':path[1]);
			var action = (path.length == 2?'index':path[2]);
			eval(controller+'Controller.'+action+'Action()');
		},
		render: function(path, opts){
			opts['curr_page'] = this.req.originalUrl;
			this.addVars(opts, function(){
				base.res.render(path, this);
			});
		},		
		redirect: function(url){
			this.res.redirect(url);
		},
		addVars: function(opts, callback){
			var arr = [];
			for (var name in this) (name.indexOf('_') == 0?arr.push(name):'');
			base.run(arr, function(func_name){
				opts[func_name] = this;
			}, function(){
				callback.call(opts);
			})
		},
		run: function(arr, callback, end){
			if (!arr || !arr.length) end();
			else {
				var func = arr.shift();
				base[func](function(data){
					callback.call(data, func);
					base.run(arr, callback, end);
				});				
			}
		},
		_headMenu: function(callback){
			models.menus.getAllPopulate(callback);
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
		err: [],
		path: 'admin/',
		layout: 'admin_layout.html',
		indexAction: function() {
			this.render('index');
		},
////////// BEGIN PAGE ACTIONS ////////////		
		pagesAction: function(view) {
			if (base.post && base.post.act && !view) {
				this[base.post.act]();
			} else {				
				var menu = models.menus.getAllPopulate(function(data){
					adminController.render('pages', {
						menu: data
					});
				})
			}
		},
		newPageAction: function() {
			if (base.post && base.post.page_name && base.post.file_name) {
				var newPage = {
					'name': base.post.page_name,
					'title': base.post.title,
					'descr': base.post.descr,
					'path': base.post.file_name,
					'show': (base.post.show?true:false)
				}
				var menu_id = base.post.menu_id;
				models.pages.add(newPage, function(page_id){
					models.menus.addPageInMenu(menu_id, page_id, function(){
						adminController.pagesAction(true);
					});
				});
			} else {
				var menu = models.menus.getAll(function(data){
					adminController.render('newPage', {
						menu: data
					});
				})
			}			
		},
		edit_pageAction: function() {
			if (base.post && base.post.page_name && base.post.file_name && base.req.params.id) {
				var data = {
					'name': base.post.page_name,
					'title': base.post.title,
					'descr': base.post.descr,
					'path': base.post.file_name,
					'show': (base.post.show?true:false)
				}
				page_id = base.req.params.id;
				if (page_id) {
					models.pages.editPage(page_id, data, function(){
						base.redirect('/admin/pages');		
					})
				}
			} else {
				if (base.req.params.id) {
					models.pages.pageById(base.req.params.id, function(page){
						adminController.render('editPage', {
							page: page
						});
					});
				} else {
					base.redirect('/admin/pages');
				}
			}
		},
////////// END PAGE ACTIONS ////////////		

////////// BEGIN MENU ACTIONS ////////////
		addMenuItem: function(callback) {
			if (base.post.item_name) {
				newMenu = {
					name: base.post.item_name,
					show: (base.post.show?true:false)
				}
				models.menus.add(newMenu, function(){
					adminController.pagesAction(true);
				});
			} else {
				base.redirect('/admin/pages');
			}
		},
		editMenu: function(callback) {
			if (base.post.item_name && base.post.id) {
				menuItem = {
					name: base.post.item_name,
					show: (base.post.show?true:false)
				}
				models.menus.edit(base.post.id, menuItem, function(){
					adminController.pagesAction(true);
				});
			} else {
				this.pagesAction(true);	
			}
		},
		remove_menuAction: function() {
			if (base.req.params.id) {
				models.menus.remove(base.req.params.id, function(){
					base.redirect('/admin/pages');
				});
			} else {
				base.redirect('/admin/pages');
			}
		},
		update_menuAction: function(){
			if (base.post) {
				models.menus.massUpDate(base.post, function(){
					adminController.pagesAction(true);
				})
			}
			adminController.pagesAction(true);
		},
////////// END MENU ACTIONS ////////////

		productsAction: function() {
			this.render('index');
		},
		ordersAction: function() {
			this.render('index');
		},
		render: function(name, opts) {
			if (!opts) opts = {};
			if (this.err) opts['err'] = this.err;
			opts['layout'] = this.layout;
			base.render(this.path+name+'.html', opts)
		}
	}

	return function(req, res, next) {
		base.init(req, res, next);
	};
}

