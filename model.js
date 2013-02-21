exports.init = function(mongoose, schema){
	var models = {
		users: {
			model: mongoose.model('Users', schema.Users),
			save: function(){
				
			},
			getAll: function(){
				this.model.find({
					name: 'fun'
				}, function(err, res){
					console.log(err)
					console.log(res[0])
				})
			}
		}

	}
	return models;
}