const {Router} = require('express')
const questionController = require('../controllers/questionController')

const router = new Router()

router.post('/get_by_id', questionController.getQuestionById)

module.exports = router