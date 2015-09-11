var express = require('express');
var regRouter = express.Router();
var crypto = require('crypto'); // 加密的
var Users = require('../models/users');

regRouter.route('/')
.get(function(req,res){
	res.render('page-register',{title:'注册'});	
})
.post(function(req,res){
	var pwd = req.body['register-password']; // post数据获取
	var repwd = req.body['register-password2'];
	if (pwd != repwd){
		req.flash('error','两次输入密码不一致');
		return res.redirect('/');
	}
	
	// 生成口令散列值
	var md5 = crypto.createHash('md5');
	pwd = md5.update(pwd).digest('base64');
	
	// 调用models User 进行数据添加
	var newUser = new Users({
		name : req.body['register-username'],
		pwd : pwd
	});
	
	// 先判断是否存在用户名
	Users.get(newUser.name,function(err,user){
		if(user){
			// 已经存在了
			err = '用户名已存在';
		}
		
		if(err){
			req.flash('error',err);
			return res.redirect('/register');
		}
		
		// 如果不存在新增用户
		newUser.save(function(err){
			if(err){
				req.flash('error', err);
			}
			
		  //	req.session.user = newUser;
			req.flash('success','注册成功');
			res.redirect('/login');
		});
	});
});

module.exports = regRouter;

