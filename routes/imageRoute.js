const router = require('express').Router();
const auth = require('../middleware/auth');
const imageController = require('../controllers/imageController');

router.get('/createImage{/:id}',auth,imageController.createImage);
router.post('/createImage',auth,imageController.uploadImage);

module.exports = router;