
var mongodb = require('../config/db') // 引入 mongodb  

// 构造函数
function Users(user) {
	this.name=user.name;
	this.pwd=user.pwd;
};

module.exports = Users;

Users.prototype.save = function save(callback){
	
	var user = {
		name:this.name,
		pwd:this.pwd
	};
	
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		
		// 连接users 表
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);				
			}
			
			// 为 name 添加索引
			collection.ensureIndex('name',{unique:true});
		
			// 写入user 到mongodb users 表
			collection.insert(user, {safe:true},function(err,user){
			mongodb.close();
			callback(err,user);	
			});
		});
		
	});	
};

// 判断用户名是否存在
Users.get = function(userName,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		
		// 读取users 集合
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			
			// 查找 name属性为 username的文档
			collection.findOne({name:userName},function(err,doc){
				mongodb.close();
				if(doc){
					// 说明找到了
					var user = new Users(doc);
					return callback(err,user);
				}
				
				return callback(err,null);
				
			});	
			
		});
	});
}