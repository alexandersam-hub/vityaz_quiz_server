const {Router} = require('express')
const questionController = require('../controllers/questionController')

const router = new Router()

router.post('/get_by_id', questionController.getQuestionById)
router.post('/get_by_id_admin', questionController.getAllQuestionById)

module.exports = router