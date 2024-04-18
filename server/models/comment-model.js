import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    text: {
        type: String,
        required: true
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })

const Comment = model("Comment", commentSchema)
export default Comment