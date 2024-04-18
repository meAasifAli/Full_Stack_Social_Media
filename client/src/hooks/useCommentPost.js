import { useState } from 'react'
import useShowToast from './useShowToast'
import axios from 'axios'
import { POST_BASE_URL } from '../constants'

function useCommentPost() {
    const { showToast } = useShowToast()
    const [loading, setLoading] = useState(false)

    const handleAddComment = async (postId, text) => {
        setLoading(true)
        try {
            const res = await axios.post(`${POST_BASE_URL}/comment/${postId}`, { text })
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
