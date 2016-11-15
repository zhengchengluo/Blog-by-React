var db = require('./db');

function Blogger(blogger) {
	this.name = blogger.name;
	this.password = blogger.password;
	//this.email = blogger.email;
}
//博主的账号信息获取，插入需要手动
Blogger.prototype.get = function (name, callback) {
	db.open(function (err) {
		if (err) {return callback(err);}
		db.collection('blogger',function (err,collection) {
			if(err) {
				db.close();
				return callback(err);
			}
			collection.findOne({
				name: name
			},function (err, blogger) {
				if (err) {return callback(err);}
				callback(null,blogger)
			})
		})
	})
}