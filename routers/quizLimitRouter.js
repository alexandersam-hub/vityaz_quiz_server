const {Router} = require('express')
const quizLimitController = require('../controllers/quizLimitController')

const router = new Router()

    router.post('/get', quizLimitController.getQuizLimitList)
    router.post('/add', quizLimitController.createUserLimit)
    router.post('/remove', quizLimitController.removeQuizLimit)

module.exports = router