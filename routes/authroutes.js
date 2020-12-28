const { Router } = require('express')
const authController = require('../controllers/authcontroller')
const router = Router();
const bodyParser = require('body-parser');








router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/signup',authController.signup_get);

router.post('/signup',authController.signup_post);

router.get('/login',authController.login_get);

router.post('/login',authController.login_post);
module.exports = router;

router.get('/logout',authController.logout_get);