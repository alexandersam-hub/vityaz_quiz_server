const {Router} = require('express')
const constructorController = require('../controllers/constructorController')
const router = new Router()

router.post('/quiz/add',constructorController.addQuiz)
router.post('/question/add',constructorController.addQuestion)

module.exports = router