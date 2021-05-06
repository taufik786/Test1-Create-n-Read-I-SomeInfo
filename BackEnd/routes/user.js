const router = require('express').Router();

const userController = require('../controllers/auth');

router.post('/register', userController.createUser)
router.post('/login', userController.LoginUser)
module.exports = router;
