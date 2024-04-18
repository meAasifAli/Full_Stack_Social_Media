import User from '../models/user-model.js'
import { v2 as cloudinary } from 'cloudinary'

const updateUser = async (req, res) => {
    try {
        let { username, fullname, email, profilePic, bio } = req.body

        const { id } = req.params
        const userId = req.user._id

        if (id.toString() !== userId.toString()) {
            return res.status(401).json({ error: "You are not authorized to update this profile" })
        }

        let user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        if (profilePic) {
            const imgRes = await cloudinary.uploader.upload(profilePic)
            profilePic = imgRes.secure_url
        }

        user.username = username || user.username
        user.fullname = fullname || user.fullname
        user.email = email || user.email
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio

        const userUpdated = await user.save()

        res.status(200).json({
            _id: userUpdated._id,
            username: userUpdated.username,
            fullname: userUpdated.fullname,
            email: userUpdated.email,
            profilePic: userUpdated.profilePic,
            bio: userUpdated.bio,
            followers: userUpdated?.followers,
            following: userUpdated?.following,
            posts: userUpdated?.savedPosts
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error in updating the user Profile" })
    }
}

const followUnfollowUser = async (req, res) => {
    try {
        const userId = req.user._id
        const { id } = req.params

        const currUser = await User.findById(userId)
        const userToModify = await User.findById(id)

        if (id === userId.toString()) {
            return res.status(401).json({ error: "You cannot follow yourself" })
        }

        const isFollowing = currUser.following.includes(id)

        if (isFollowing) {
            //unfollow the user
            await User.findByIdAndUpdate(userId, { $pull: { following: id } })
            await User.findByIdAndUpdate(id, { $pull: { followers: userId } })
            res.status(200).json({ message: "User Unfollowed" })
        } else {
            //follow the user
            await User.findByIdAndUpdate(userId, { $push: { following: id } })
            await User.findByIdAndUpdate(id, { $push: { followers: userId } })
            res.status(200).json({ message: "User Followed" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Follow/Unfollow the user Profile" })
    }
}

const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId).populate({
            path: "savedPosts",
            model: "Post"
        })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in getting the user Profile" })
    }
}

const getConversations = async (req, res) => {
    try {
        const userId = req.user._id


        const allUsers = await User.find({})
        const conversations = allUsers.filter((user) => user._id.toString() !== userId.toString())

        res.status(200).json(conversations)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in getting the user conversations" })
    }
}
export { updateUser, followUnfollowUser, getSingleUser, getConversations }