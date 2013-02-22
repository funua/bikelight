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
			model: mongoose.model('Users', schema.Users),
			getAll: function(){
				console.log('try get all pages')
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