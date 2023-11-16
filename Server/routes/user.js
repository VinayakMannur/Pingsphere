const express = require('express');
const authenticate = require('../middlewares/authenticator');
const userController = require('../controllers/user')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router  = express.Router();

router.get('/update-me', authenticate, userController.updatedMe)

router.get('/get-users', authenticate, userController.getUsers)

router.get('/get-friends', authenticate, userController.getFriends)

router.get('/get-friend-requests', authenticate, userController.getRequests)

router.post('/upload', userController.handleFileUpload)

module.exports = router;
