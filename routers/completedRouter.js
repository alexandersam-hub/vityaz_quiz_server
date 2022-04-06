const {Router} = require('express')
const completedController = require('../controllers/completedController')

const router = new Router()

router.post('/', completedController.addCompleted)

module.exports = router