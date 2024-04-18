import axios from "axios";
import useShowToast from "./useShowToast";


const useFollowUnfollow = () => {
    const { showToast } = useShowToast()
    const handleFollowUnfollow = async (userToFollow) => {
        try {
            const res = await axios.post(`https://full-stack-social-media-pq4h.onrender.com/api/user/follow/${userToFollow._id}`)

            if (res?.status === 200) {
                showToast({
                    title: "Successful",
                    description: res?.data?.message,
                    isClosable: true,
                    duration: 5000,
                    position: "bottom-right",
                    status: "success"
                })
                window.location?.reload()
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

    return { handleFollowUnfollow }
}
export default useFollowUnfollow