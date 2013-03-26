
var base = {
	init: function(db) {
		base.db = db;
		base.models = require('./model').init(db, base.schemes);
		base.auth = require('./auth').init(base.models.users);
		base.controller = require('./controller').init(base.models);
		return base;
	},
	get schemes() {
		return {
			Users: new base.db.Schema({
				'name':  String,
				'email': String,
				'password': String,
				'is_admin': Boolean
			}),
			Pages: new base.db.Schema({
				'name': String,
				'title': String,
				'descr': String,
				'path': String,
				'pos': Number,
				'vars': [],
				'show': Boolean
			}),
			Menus: new base.db.Schema({
				'name': String,
				'pages': [{type: base.db.Schema.Types.ObjectId, ref: 'Pages'}],
				'default_page': {type: base.db.Schema.Types.ObjectId, ref: 'Pages'},
				'pos': Number,
				'show': Boolean
			})
		}
	}
}

module.exports = base.init;