var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('index', { title: '首页', userName: req.flash('success').toString() });
});

module.exports = router;
