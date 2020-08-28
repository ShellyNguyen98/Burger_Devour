const router = require('express').Router()
const grocery = require('../models/burger.js')

router.get('/', (req, res) => {
  grocery.getAll(groceries => {
    res.render('index', { burgers })
  })
})

module.exports = router
