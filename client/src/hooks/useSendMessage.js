import { useState } from "react"
import useShowToast from "./useShowToast"
import axios from "axios"

import useMsgStore from "../store/useMsgStore"

const useSendMessage = (receiverID) => {
    const { setMessages, messages } = useMsgStore()
    const { showToast } = useShowToast()
    const [loading, setLoading] = useState(false)

    const handleSendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await axios.post(`https://full-stack-social-media-pq4h.onrender.com/api/message/send/${receiverID}`, message)
            if (res?.status === 201) {
                setMessages([...messages, res.data])
            }
        } catch (error) {
            setLoading(false)
            showToast({
                description: error?.response?.data?.error,
                title: "error",
                duration: 5000,
                position: "bottom-right",
                isClosable: true,
                status: "error"
            })

        }
        finally {
            setLoading(false)
        }
    }
    return { handleSendMessage, loading }
}
export default useSendMessage