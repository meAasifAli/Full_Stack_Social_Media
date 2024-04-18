import jwt from 'jsonwebtoken'
import User from '../models/user-model.js'

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ error: "You are not authenticated" })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(verified.userId).select("-password")

        req.user = user;

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error in verifyin the token" })
    }
}

export default protectedRoute