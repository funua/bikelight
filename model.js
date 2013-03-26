exports.init = function(mongoose, schema){
	var models = {
		users: {
			model: mongoose.model('Users', schema.Users),
			save: function(){
				
			},
			getAll: function(){
				this.model.find({}, function(err, res){
					console.log(err)
					console.log(res[0])
				})
			},
			findUser: function(fields, callback){
				this.model.findOne(fields, function(err, res){
					callback(err, res);
				})
			}
		},
		pages: {
			model: mongoose.model('Pages', schema.Pages),
			add: function(data, callback) {
				var add = new this.model(data);
				add.save(function(err, req){
					callback(req._id);
				});
			},
			getAll: function(){
				console.log('try get all pages')
			},
			pageById: function(id, callback){
				this.model.findOne({_id:id}, function(err, res){
					callback(res);
				});
			},
			editPage: function(id, data, callback){
				this.model.update({_id:id}, {$set:data}).exec(function(err, req){
					callback();
				});
			}
		},
		menus: {
			model: mongoose.model('Menus', schema.Menus),
			add: function(data, callback) {
				var add = new this.model(data);
				add.save(function(err, req){
					callback(req._id);
				});
			},
			edit: function(id, data, callback) {
				this.model.update({ _id : id }, { $set: data}).exec(function(err, req){
					if (callback) callback();
				});
			},
			remove: function(id, callback){
				this.model.remove({ _id: id }).exec(function(err, req){
					callback();
				});
			},
			getAll: function(callback) {
				this.model.find({}).sort({pos: 'asc'}).exec(function(err, req){
					callback(req);
				})
			},
			getAllPopulate: function(callback) {
				this.model.find({}).sort({pos: 'asc'}).populate('pages').exec(function(err, req){
					callback(req);
				})
			},
			addPageInMenu: function(menu_id, page_id, callback) {
				this.model.update({ _id : menu_id }, { $push: {pages: page_id}}).exec(function(err, req){
					callback();
				});
			},
			massUpDate: function(arr, callback){
				docs = [];
				for (id in arr) docs.push(arr[id]);
				model = this;
				function saveAll(){
			  		var doc = docs.shift();
					model.edit(doc.id, {
						pos: doc.pos,
						pages: (doc.pages?doc.pages:[])
					}, function(){
						if (docs.length == 0) {
							callback();
						} else saveAll();
					});
				}

				saveAll();

			}
		}
	}
	return models;
}



// var Users = mongoose.model('Users', UsersSchema);

// var newUser = new Users({
// 	name: 'fun',
// 	email: 'funsersver@gmail.com',
// 	password: '123'
// });

// newUser.save(function(err, req){
// 	console.log(err);
// 	console.log(req);
// })

// Users.find({
// 	name: 'fun'
// }, function(err, res){
// 	console.log(err)
// 	console.log(res[0])
// })