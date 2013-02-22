exports.init = function(model){
	var auth = {
		model: model,
		tryAuth: function(req, success, failed){
			if (req.body.email && req.body.password) {
				this.model.findUser({
					email: req.body.email,
					password: req.body.password
				}, function(err, res){
					if (err) failed(err);
					else if (!res) { 
						failed('auth.wrong_pass_or_email');
					} else {
						req.session.user_id = res._id;
						req.session.is_admin = res.is_admin;
						success();
					}
				})
			} else {
				err = null;
				if (req.body.form_submit) {
					err = 'auth.empty_fields';
				}
				failed(err);
			} 
		}
	}
	return auth;
}