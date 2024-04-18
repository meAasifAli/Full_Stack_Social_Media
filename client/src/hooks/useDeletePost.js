import useShowToast from './useShowToast'
import axios from 'axios'
import usePostStore from '../store/usePostStore'

const useDeletePost = () => {
    const { showToast } = useShowToast()
    const { setPosts, posts } = usePostStore()

    const handleDeletePost = async (postId) => {
        try {
            const res = await axios.delete(`https://full-stack-social-media-pq4h.onrender.com/api/post/delete/${postId}`)
            if (res?.status === 200) {
                // console.log(res?.data);
                setPosts(posts?.filter((post) => post._id !== postId))
                showToast({
                    title: "success",
                    description: res?.data?.message,
                    status: "success",
                    isClosable: true,
                    duration: 5000
                })
            }
        } catch (error) {
            console.log(error);
            showToast({
                title: "error",
                description: error?.response?.data?.error,
                status: "error",
                isClosable: true,
                duration: 5000
            })
        }
    }
    return { handleDeletePost }
}
export default useDeletePost