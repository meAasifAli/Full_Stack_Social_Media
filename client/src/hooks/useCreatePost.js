import { useState } from 'react'
import axios from 'axios'
import useShowToast from './useShowToast'
import { useNavigate } from 'react-router-dom'

const useCreatePost = () => {
    const navigate = useNavigate()
    const { showToast } = useShowToast()
    const [loading, setLoading] = useState(false)

    const handleCreatePost = async (postData) => {
        setLoading(true)
        try {
            const res = await axios.post(`https://full-stack-social-media-pq4h.onrender.com/api/post/create`, postData)

            if (res.status === 200) {
                showToast({
                    title: "success",
                    description: "Post created successfully",
                    status: "success",
                    isClosable: true,
                    duration: 5000
                })
                navigate("/")
            }
            // console.log(res.data)
        } catch (error) {
            setLoading(false)
            showToast({
                title: "error",
                description: error?.response?.data?.error,
                status: "error",
                isClosable: true,
                duration: 5000
            })
        }
        finally {
            setLoading(false)
        }
    }
    return { handleCreatePost, loading }
}
export default useCreatePost