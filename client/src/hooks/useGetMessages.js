import axios from "axios"
import { useEffect, useState } from "react"
import useMsgStore from "../store/useMsgStore"

const useGetMessages = (receiverID) => {
    const [loading, setLoading] = useState(false)
    const { setMessages } = useMsgStore()

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/message/getall/${receiverID}`)

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