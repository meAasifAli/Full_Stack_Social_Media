import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useMsgStore from "../store/useMsgStore"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useMsgStore()
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")

    }, [socket, setMessages, messages])
}
export default useListenMessages