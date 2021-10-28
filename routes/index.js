var express = require('express');
var router = express.Router();


const HomeController = require('../controllers/HomeController');
homeController = new HomeController();
router.get('/', homeController.index);
router.get('/login', homeController.login);
router.get('/test', homeController.test);
router.get('/check', homeController.check);
router.get('/logout', homeController.check);
router.get('/jwt_login', homeController.jwt_login);
router.get('/jwt_verify', homeController.jwt_verify);

module.exports = router;
