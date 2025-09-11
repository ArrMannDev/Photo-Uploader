const router = require('express').Router();
const auth = require('../middleware/auth');
const folderController = require('../controllers/folderController');

router.get('/create{/:id}',auth,folderController.create);
router.post('/create',auth,folderController.createFolder);

//detail Page
router.get('/:id',auth,folderController.detail);

module.exports = router;