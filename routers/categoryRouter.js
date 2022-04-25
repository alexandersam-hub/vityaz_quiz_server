const {Router} = require('express')
const categoryController = require('../controllers/categoryController')
const adminMiddleware = require('../middlewares/adminMiddleware')

const router = new Router()

router.post('/get', categoryController.getCategory)
router.post('/add', categoryController.addCategory)
router.post('/update', categoryController.updateCategory)
router.post('/del', categoryController.delCategory )

module.exports = router