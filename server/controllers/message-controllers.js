import Conversation from '../models/conversation-model.js'
import Message from '../models/Message-model.js'
import { v2 as cloudinary } from 'cloudinary'
import { getReceiverSocketId, io } from '../socket/socket.js'

const sendMessage = async (req, res) => {
    try {
        let { image, text } = req.body
        const senderID = req.user._id
        const receiverID = req.params.id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID]
            })
        }

        if (image) {
            const res = await cloudinary.uploader.upload(image)
            image = res?.secure_url
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([
            newMessage.save(),
            conversation.save()
        ])

        const receiverSocketId = getReceiverSocketId(receiverID)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Sending the Messages" })
    }
}

const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.id
        const senderId = req.user._id

        const messages = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({
            path: 'messages',
            model: "Message"
        }).exec()

        if (!messages) return res.status(200).json([]);
        res?.status(200).json(messages?.messages)
    } catch (error) {

    }
}

export { sendMessage, getMessages }