const Router = require('express')
const PostsController = require('../controller/posts.controller')
const router = new Router()

router.post('/posts', PostsController.createPost)
router.get('/posts', PostsController.getPosts)
router.get('/posts/:id', PostsController.getOnePost)
router.put('/posts', PostsController.updatePost)
router.delete('/posts/:id', PostsController.deletePost)



module.exports = router 