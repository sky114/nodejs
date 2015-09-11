var express = require('express');
var loginRouter = express.Router();
var crypto = require('crypto'); // 加密的 
var User = require('../models/users'); // 用户model

loginRouter.route('/')
.get(function(req,res){
	// reponse login page
	res.render('page-login',{title:'登陆'});	
})
.post(function(req,res){
	// login validate
	var userName = req.body['login-username'];
	var pwd = req.body['login-password'];
	
	// md5 下
	var md5 = crypto.createHash('md5');
	pwd = md5.update(pwd).digest('base64');
	
	User.get(userName, function(err, user){
		if(!user){
			req.flash('error', '用户名不存在');
			return res.redirect('/login');
		}
		
		if(user.pwd != pwd){
			req.flash('error', '用户密码错误');
			return res.redirect('/login');
		}
		
		req.session.user = user;
		req.flash('success',userName);
		res.redirect('/');
	});
});

module.exports = loginRouter;