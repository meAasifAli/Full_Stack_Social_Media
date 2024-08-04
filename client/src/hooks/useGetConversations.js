import { useEffect, useState } from "react"

import axios from 'axios'
import useConversationStore from "../store/useConversation"

const useGetConversations = () => {
    const { setConversations } = useConversationStore()
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:5000/api/user`)
                if (res?.status === 200) {
                    setConversations(res?.data)
                }
            } catch (error) {
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [setConversations])

    return { loading }
}
export default useGetConversations