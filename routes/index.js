var express = require('express');
var router = express.Router();
var auth = require('../Middleware/auth')
/* GET home page. */
router.get('/auth', auth.verifyToken, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
