const {Router} = require('express')
const imageController = require('../controllers/imagesController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const router = new Router()


router.post('/upload', adminMiddleware, imageController.uploadImages)
router.get('/get/:id', imageController.getImages)

module.exports = router