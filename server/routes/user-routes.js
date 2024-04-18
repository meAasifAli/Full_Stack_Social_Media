import express from 'express'
import { followUnfollowUser, getConversations, getSingleUser, updateUser } from '../controllers/user-controller.js'
import protectedRoute from '../middlewares/auth-middleware.js'

const router = express.Router()

router.get("/:id", protectedRoute, getSingleUser)
router.put("/update/:id", protectedRoute, updateUser)
router.post("/follow/:id", protectedRoute, followUnfollowUser)
router.get("/", protectedRoute, getConversations)

export default router