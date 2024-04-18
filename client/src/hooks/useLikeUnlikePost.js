import axios from 'axios'
import { POST_BASE_URL } from "../constants/index"

const useLikeUnlikePost = () => {
    const handleLikeUnlikePost = async (postID) => {
        try {
            const res = await axios.post(`${POST_BASE_URL}/like/${postID}`)
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