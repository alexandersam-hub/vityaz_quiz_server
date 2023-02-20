const {Router} = require('express')
const tokenController = require('../controllers/tokenController')


const router = new Router()

router.post('/remove', tokenController.removeToken)

module.exports = router