import { Schema, model } from "mongoose";

const msgSchema = new Schema({
    senderID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiverID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Message = model("Message", msgSchema);
export default Message