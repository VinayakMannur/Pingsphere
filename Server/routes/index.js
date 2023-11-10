const router = require('express').Router();

const authRoutes = require('./auth')
const userRoutes = require('./user')
const msgRoutes = require('./messages')

router.use('/auth', authRoutes);

router.use('/user', userRoutes)

router.use('/msg', msgRoutes)

module.exports = router;