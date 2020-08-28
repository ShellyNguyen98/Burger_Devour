const router = require('express').Router()

router.use('/api', require('./burgersController.js'))
router.use('/', require('./viewController.js'))

module.exports = router
