import axios from "axios"
import { POST_BASE_URL } from "../constants"
import useShowToast from "./useShowToast"


const useDeleteComment = () => {
    const { showToast } = useShowToast()
    const handleDeleteComment = async (commentID) => {
        try {
            const res = await axios.delete(`${POST_BASE_URL}/delete/comment/${commentID}`)
            // console.log(res)
            if (res?.status === 200) {
                showToast({
                    title: "success",
                    description: res?.data?.message,
                    status: "success",
                    isClosable: true,
                    duration: 5000
                })
                window?.location?.reload()
            }
        } catch (error) {
            showToast({
                title: "error",
                description: error?.response?.data?.error,
                status: "error",
                isClosable: true,
                duration: 5000
            })
        }
    }
    return { handleDeleteComment }
}
export default useDeleteComment