import axios from "axios"
import useShowToast from "./useShowToast"
import { useState } from "react"
import { POST_BASE_URL } from "../constants"
import { useNavigate } from "react-router-dom"



const useUpdatePost = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { showToast } = useShowToast()

    const handleUpdatePost = async (postId, postData) => {
        setLoading(true)
        try {
            const res = await axios.put(`${POST_BASE_URL}/edit/${postId}`, postData)
            if (res?.status === 200) {

                showToast({
                    title: "Successful",
                    description: "Signup Success",
                    isClosable: true,
                    duration: 5000,
                    position: "bottom-right",
                    status: "success"
                })
                window.location?.reload()
                navigate("/")
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
    return { handleUpdatePost, loading }
}
export default useUpdatePost