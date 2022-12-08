const {Router} = require('express')
const userQuizController = require('../controllers/UserQuizController')
const userMiddleware = require('../middlewares/usersMiddleware')

const router = new Router()

router.post('/add',userMiddleware,userQuizController.createUserQuiz)
router.post('/update',userMiddleware, userQuizController.updateUserQuiz)
router.post('/del',userMiddleware, userQuizController.removeUserQuiz)
router.post('/get',userMiddleware, userQuizController.getUserQuiz)

module.exports = router