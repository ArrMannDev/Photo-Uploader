const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', authController.loginUser);

router.get('/signUp', authController.signUp);
router.post('/signUp', authController.signUpUser);

module.exports = router;