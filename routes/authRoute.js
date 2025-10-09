const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', authController.loginUser);

router.get('/signUp', authController.signUp);
router.post('/signUp', authController.signUpUser);

router.get('/edit{/:id}',authController.edit);
router.post("/edit",authController.editUser);
router.post("/delete/:id",auth,authController.deleteUser)

module.exports = router;