const {Router} = require('express')
const supportController = require('../controllers/supportController')

const router = new Router()

router.post('/add',supportController.newPost)
router.post('/get',supportController.getPosts)
router.post('/delete',supportController.deletePost)
router.post('/update', supportController.updatePost)

module.exports = router