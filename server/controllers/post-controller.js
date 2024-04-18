import { v2 as cloudinary } from 'cloudinary';
import User from '../models/user-model.js';
import Post from '../models/post-model.js';
import Comment from '../models/comment-model.js';


const createPost = async (req, res) => {
    try {
        const userID = req.user._id
        let { photo, text } = req.body

        const user = await User.findById(userID)

        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (photo) {
            const res = await cloudinary.uploader.upload(photo)
            photo = res.secure_url
        }

        const post = new Post({
            postedBy: userID,
            photo,
            text,
        })

        user.savedPosts.push(post)
        await Promise.all([post.save(), user.save()])

        return res.status(200).json(post);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error in creating the post" });
    }
}

const getPosts = async (req, res) => {
    try {

        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "postedBy",
            model: "User",
        }).populate({
            path: "comments",
            model: "Comment",
            populate: {
                path: "commentedBy",
                model: "User"
            }
        })
        return res.status(200).json(posts)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "error in getting the posts" });
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id
        const { id: postId } = req.params

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "post not found" });
        }

        const userLikesPost = post.likes.includes(userId)

        if (userLikesPost) {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString())

        }
        else {
            post.likes.push(userId)
        }

        await post.save()
        res.status(200).json(post)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error in liking/unliking the post" });
    }
}

const commentPost = async (req, res) => {
    try {
        const { text } = req.body
        const userId = req.user._id
        const { id: postId } = req.params

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "post not found" });
        }

        const comment = new Comment({
            postId: postId,
            commentedBy: userId,
            text
        })
        await Promise.all([Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }), comment.save()])
        res.status(201).json(comment)
    } catch (error) {
        console.log(error);
    }
}

const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id).populate({
            path: "comments",
            model: "Comment",
            populate: {
                path: "commentedBy",
                model: "User",
            }
        })

        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error in getting the single post" });
    }
}

const deletePost = async (req, res) => {
    try {
        const userId = req.user._id
        const { id: postId } = req.params

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "post not found" });
        }

        if (post?.postedBy.toString() !== userId.toString()) {
            return res.status(401).json({ error: "unauthorized to delete the post" });
        }

        await Promise.all([Post.findByIdAndDelete(postId), Comment.deleteMany({ postId: postId }), User.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } })])

        res.status(200).json({ message: "post deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error in deleting the post" });
    }
}

const editPost = async (req, res) => {
    try {
        let { photo, text } = req.body
        const userId = req.user._id;
        const { id: postId } = req.params

        const user = await User.findById(userId)
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "post not found" });
        }


        if (post?.postedBy.toString() !== userId.toString()) {
            return res.status(401).json({ error: "unauthorized to edit the post" });
        }

        if (photo) {
            const res = await cloudinary.uploader.upload(photo)
            photo = res.secure_url

        }

        await Post.findByIdAndUpdate(postId, { photo, text }, { new: true })

        res.status(200).json({ message: "post edited successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error in editing the post" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id: commentID } = req.params
        const userID = req.user._id
        const comment = await Comment.findById(commentID)

        if (comment?.commentedBy?.toString() !== userID.toString()) {
            return res.status(401).json({ error: "unauthorized to delete the comment" })
        }

        await Promise.all([Comment.findByIdAndDelete(commentID), Post.findByIdAndUpdate(comment.postId, { $pull: { comments: commentID } })])

        res.status(200).json({ message: "comment deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error in deleting the comment" });
    }
}
export { createPost, getPosts, likeUnlikePost, commentPost, getSinglePost, deletePost, editPost, deleteComment }