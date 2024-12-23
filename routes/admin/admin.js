var express = require('express');
var router = express.Router();
var AD = require('../../controller/admin/auth.controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Admin' });
});

router.post('/register' ,AD.registerAdmin)
router.post('/login' ,AD.loginAdmin)
module.exports = router;
