const express = require('express')
const router = express.Router()

router.get('/index', (req, res, next) => {
  res.status(200)
  res.json({
    code: 0
  })
})

module.exports = router

