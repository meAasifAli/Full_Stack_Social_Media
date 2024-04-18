import express from 'express'
import protectedRoute from '../middlewares/auth-middleware.js'
import { commentPost, createPost, deleteComment, deletePost, editPost, getPosts, getSinglePost, likeUnlikePost } from '../controllers/post-controller.js'

const router = express.Router()

router.get("/:id", getSinglePost)
router.get("/", getPosts)
router.post("/create", protectedRoute, createPost)
router.post("/like/:id", protectedRoute, likeUnlikePost)
router.post("/comment/:id", protectedRoute, commentPost)
router.delete("/delete/:id", protectedRoute, deletePost)
router.put("/edit/:id", protectedRoute, editPost)
router.delete("/delete/comment/:id", protectedRoute, deleteComment)

export default router