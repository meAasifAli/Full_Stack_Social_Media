import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        default: ""
    },
    photo: {
        type: String,
        default: ""
    },
    likes: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    comments: {
        type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        default: []
    }
}, { timestamps: true })

const Post = model("Post", postSchema);
export default Post