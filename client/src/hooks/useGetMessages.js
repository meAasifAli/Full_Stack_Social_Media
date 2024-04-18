import axios from "axios"
import { useEffect, useState } from "react"
import { MSG_BASE_URL } from "../constants"
import useMsgStore from "../store/useMsgStore"

const useGetMessages = (receiverID) => {
    const [loading, setLoading] = useState(false)
    const { setMessages } = useMsgStore()

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${MSG_BASE_URL}/getall/${receiverID}`)

                if (res?.status === 200) {
                    setMessages(res?.data)
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [receiverID, setMessages])
    return { loading }
}
export default useGetMessages