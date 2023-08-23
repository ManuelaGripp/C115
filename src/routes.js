const router = require('express').Router()
const questionController = require('./controllers.js')

router.get('/question', questionController.read)
router.post('/question', questionController.sendAnswer)

module.exports = router;