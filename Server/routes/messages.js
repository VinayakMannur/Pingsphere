const express = require('express');
const authenticate = require('../middlewares/authenticator');
const messageController = require('../controllers/messages')

const router  = express.Router();

router.get('/get-messages', authenticate, messageController.getMessages)

module.exports = router;