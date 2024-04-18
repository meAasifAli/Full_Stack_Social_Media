import User from '../models/user-model.js'
import bcrypt from 'bcryptjs'
import genToken from "../helpers/genToken.js"


const signupUser = async (req, res) => {
    try {
        let { username, fullname, email, password, profilePic, bio } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ error: "User already exists" })
        }

        if (password) {
            let hashedPass = await bcrypt.hash(password, 10)
            password = hashedPass
        }
        const newUser = new User({
            username,
            fullname,
            email,
            password,
            profilePic,
            bio
        })

        await newUser.save()

        if (newUser) {
            genToken(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
                bio: newUser.bio,
                followers: newUser?.followers,
                following: newUser?.following,
                posts: newUser?.savedPosts
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error in signup" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" })
            }
            else {
                genToken(user._id, res)
                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    profilePic: user.profilePic,
                    bio: user.bio,
                    followers: user?.followers,
                    following: user?.following,
                    posts: user?.savedPosts
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error in login" })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 })
        res.status(200).json({ message: "Logged out" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error in logout" })
    }
}

export { signupUser, loginUser, logoutUser }