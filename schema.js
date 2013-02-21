exports.init = function(mongoose){
	var schemes = {
		Users: new mongoose.Schema({
			'name': {
				type: 'String'
			},
			'email': {
				type: 'String'
			},
			'password': {
				type: 'String'
			}
		}),
		Pages: new mongoose.Schema({
			'name': {
				type: String
			},
			'title': {
				type: String
			},
			'descr': {
				type: String
			},
			'path': {
				type: String
			},
			'pos': {
				type: Number
			},
			'vars': {
				type: []
			},
			'show': {
				type: Boolean
			}
		}),
		Menu: new mongoose.Schema({
			'name': {
				type: String
			},
			'pages': {
				type: [mongoose.Schema.Types.ObjectId]
			},
			'default_page': {
				type: mongoose.Schema.Types.ObjectId
			},
			'pos': {
				type: Number
			},
			'show': {
				type: Boolean
			}
		})
	}
	return schemes;
}