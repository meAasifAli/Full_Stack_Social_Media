import path from "path"
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

import { app, server } from './socket/socket.js'

import connectToMongoDb from './config/DB.js'
import authRoutes from './routes/auth-routes.js'
import userRoutes from './routes/user-routes.js'
import postRoutes from './routes/post-routes.js'
import msgRoutes from './routes/message-routes.js'

const __dirname = path.resolve()


dotenv.config()



//middlewares
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

server.listen(process.env.PORT_NO, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT_NO}`);
})


//cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Database Config
await connectToMongoDb()

//routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/message", msgRoutes)

app.use(express.static(path.join(__dirname, "../client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})