import express from "express"
import protectdRoute from "../middlewares/auth-middleware.js"
import { getMessages, sendMessage } from "../controllers/message-controllers.js"

const router = express.Router()


router.post("/send/:id", protectdRoute, sendMessage)
router.get("/getAll/:id", protectdRoute, getMessages)


export default router