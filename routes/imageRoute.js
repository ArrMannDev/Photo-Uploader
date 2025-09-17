const router = require('express').Router();
const auth = require('../middleware/auth');
const imageController = require('../controllers/imageController');

router.get('/createImage{/:id}',auth,imageController.createImage);
router.post('/createImage',auth,imageController.uploadImage);
router.post("/delete", auth, imageController.deleteImage);

module.exports = router;