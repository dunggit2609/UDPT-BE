const express = require('express');
const UserController = require("../controllers/userController")
const router = express.Router();
const authenticate = require('../../../middlewares/authenticate');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a Root Dir2');
});

router.get('/me',[authenticate], UserController.getMyInfo)

module.exports = router;
