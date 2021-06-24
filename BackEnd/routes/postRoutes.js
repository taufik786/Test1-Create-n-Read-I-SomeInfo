const router = require('express').Router();

const PostController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');

router.get('/state', checkAuth, PostController.getState);
router.get('/district', checkAuth, PostController.getDistrict);
router.get('/child', checkAuth, PostController.getChild);

router.post('/state', checkAuth, PostController.createState);
router.post('/district',checkAuth, PostController.createDistrict);
router.post('/child',checkAuth, PostController.createChild);

router.delete('/child/:id',checkAuth, PostController.DeleteChild);

module.exports = router;
