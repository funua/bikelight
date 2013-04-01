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
			'eng_name':  String,
			'title': String,
			'descr': String,
			'body' : String,
			'pos': Number,
			'vars': [],
			'show': Boolean
		}),
		Menus: new mongoose.Schema({
			'name': String,
			'eng_name':  String,
			'pages': [{type: mongoose.Schema.Types.ObjectId, ref: 'Pages'}],
			'default_page': {type: mongoose.Schema.Types.ObjectId, ref: 'Pages'},
			'pos': Number,
			'show': Boolean
		}),
		main_page: new mongoose.Schema({
			'body': String,
			'body_footer': String,
			'photos': [],
			'count_news': Number,
			'title': String,
			'descr': String
		}),
	}
	return schemes;
}