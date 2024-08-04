import { useState } from 'react'
import useShowToast from './useShowToast'
import axios from 'axios'


function useCommentPost() {
    const { showToast } = useShowToast()
    const [loading, setLoading] = useState(false)

    const handleAddComment = async (postId, text) => {
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:5000/api/post/comment/${postId}`, { text })
            if (res.status === 201) {
                showToast({
                    title: "success",
                    description: "comment added successfully",
                    status: "success",
                    isClosable: true,
                    duration: 5000
                })
                window.location?.reload()
            }
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
    return { loading, handleAddComment }
}

export default useCommentPost
