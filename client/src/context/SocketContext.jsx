import { createContext, useContext, useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import io from "socket.io-client"

const socketContext = createContext()


const SocketContextProvider = ({ children }) => {
    const { authUser } = useAuthStore()
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser?._id
                }
            })
            setSocket(socket)

            socket.on("getOnlineusers", (users) => {
                setOnlineUsers(users)
            })
            return () => setSocket(null)
        }
        else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>{children}</socketContext.Provider>
    )
}

export default SocketContextProvider

export const useSocketContext = () => useContext(socketContext)