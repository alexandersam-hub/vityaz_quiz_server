const {Router} = require('express')
const authController = require('../controllers/authController')
const router = new Router()

router.post('/login_qr', authController.loginByToken)
router.post('/login', authController.login)
router.post('/registration', authController.registration)

module.exports = router