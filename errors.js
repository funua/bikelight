var _err = {
	auth: {
		'wrong_pass_or_email': 'Не верный пароль или email',
		'empty_fields': 'Все поля обязательны к заполнению'
	}
}

exports.get = function(err){
	ret = null;

	if (err && err.indexOf('.') != -1) {
		err = err.split('.');
		if (_err[err[0]] && _err[err[0]][err[1]]) {
			ret = _err[err[0]][err[1]];	
		}		
	}
	
	return ret;
}