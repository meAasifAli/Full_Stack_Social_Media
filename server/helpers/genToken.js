
import jwt from 'jsonwebtoken';

const genToken = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

        return token
    } catch (error) {
        return res.status(500).json({ error: "Error in generating the token" })
    }
}

export default genToken