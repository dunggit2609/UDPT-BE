var express = require('express')
const AuthController = require("../controllers/authController")

var router = express.Router()

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', AuthController.signUp)
router.post('/login', AuthController.login)

module.exports = router;