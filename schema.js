exports.init = function(mongoose){
	var schemes = {
		Users: new mongoose.Schema({
			'name':  String,
			'email': String,
			'password': String,
			'is_admin': Boolean
		}),
		Pages: new mongoose.Schema({
			'name': String,
			'title': String,
			'descr': String,
			'pos': Number,
			'vars': [],
			'show': Boolean
		}),
		Menus: new mongoose.Schema({
			'name': String,
			'pages': [{type: mongoose.Schema.Types.ObjectId, ref: 'Pages'}],
			'default_page': {type: mongoose.Schema.Types.ObjectId, ref: 'Pages'},
			'pos': Number,
			'show': Boolean
		})
	}
	return schemes;
}