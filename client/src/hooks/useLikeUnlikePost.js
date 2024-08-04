import axios from 'axios'


const useLikeUnlikePost = () => {
    const handleLikeUnlikePost = async (postID) => {
        try {
            const res = await axios.post(`https://full-stack-social-media-pq4h.onrender.com/api/post/like/${postID}`)
            if (res?.status === 200) {
                window?.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return { handleLikeUnlikePost }
}
export default useLikeUnlikePost