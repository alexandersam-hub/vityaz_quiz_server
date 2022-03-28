const {Router} = require('express')
const quizController = require('../controllers/quizController')

const router = new Router()

router.post('/get_all',quizController.getAllActiveQuiz)
router.post('/get_all_admin',quizController.getAllQuiz)

module.exports = router