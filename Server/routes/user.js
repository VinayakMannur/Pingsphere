const express = require('express');
const authenticate = require('../middlewares/authenticator');
const userController = require('../controllers/user')

const router  = express.Router();

router.get('/update-me', authenticate, userController.updatedMe)

router.get('/get-users', authenticate, userController.getUsers)

router.get('/get-friends', authenticate, userController.getFriends)

router.get('/get-friend-requests', authenticate, userController.getRequests)

module.exports = router;
