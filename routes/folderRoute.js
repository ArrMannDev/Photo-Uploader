const router = require('express').Router();
const auth = require('../middleware/auth');
const folderController = require('../controllers/folderController');

router.get('/create',auth,folderController.create);
router.post('/create',auth,folderController.createFolder);

module.exports = router;