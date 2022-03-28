const {Router} = require('express')
const constructorController = require('../controllers/constructorController')
const router = new Router()

router.post('/question/add', constructorController.addQuestion)
router.post('/question/update',constructorController.updateQuestion)
router.post('/question/remove', constructorController.removeQuestion)

router.post('/quiz/add', constructorController.addQuiz)
router.post('/quiz/update', constructorController.updateQuiz)
router.post('/quiz/remove', constructorController.removeQuiz)

module.exports = router