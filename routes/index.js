var express = require('express');
var router = express.Router();


const HomeController = require('../controllers/HomeController');
homeController = new HomeController();
router.get('/', homeController.index);
router.get('/login', homeController.login);
router.get('/test', homeController.test);
router.get('/check', homeController.check);


module.exports = router;
