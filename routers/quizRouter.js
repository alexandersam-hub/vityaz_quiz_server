const {Router} = require('express')
const quizController = require('../controllers/quizController')

const router = new Router()

router.post('/get_all',quizController.getAllQuiz)

module.exports = router