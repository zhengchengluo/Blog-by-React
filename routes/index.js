var express = require('express');
var router = express.Router();
var Blogger = require('../models/blogger');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',function(req, res,next) {
	console.log({
		name: req.body.name,
		password: req.body.password
	});
	var name = req.body.name,
		  password = req.body.password;
		  
	Blogger.get(name,function(err,user) {
		if(!user) {
			res.json({'res':'用户不存在'});
			return;
		}
		if (user.password !== password){
			res.json({'res':'密码不正确'});
			return;
		}
		req.session.blogger = user
		res.json({'res':'成功'})
	})
	res.send('copy user')
})
router.post('/loginout',function(req, res,next) {

});
module.exports = router;
