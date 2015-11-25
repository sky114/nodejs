 var settings = require('../settings.js');
 var Db = require('mongodb').Db;
 var Connection = require('mongodb').Connection;
 var Server = require('mongodb').Server;
 module.exports = new Db(settings.db, new Server(settings.host, settings.port,{}));

// module.exports = {
 // url: 'mongodb://localhost/microblog'   // uri的格式类似：“mongodb://user:pass@localhost:port/database”
//}
