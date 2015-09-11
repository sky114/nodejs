var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send('sesion value'+ req.session.sessname);
});

module.exports = router;
