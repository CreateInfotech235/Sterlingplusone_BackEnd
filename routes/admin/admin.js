var express = require('express');
var router = express.Router();
var AD = require('../../controller/admin/auth.controller')
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express Admin' });
});

router.post('/register', AD.registerAdmin)
router.post('/login', AD.loginAdmin)
// update admin
router.post('/updateAdmin', AD.updateAdmin)

// update nodemailer
router.post('/updateNodemailer', AD.updateNodemailer)

// get admin
router.get('/getAdmin', AD.getAdmin)

module.exports = router;
