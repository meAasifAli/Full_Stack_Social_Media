import axios from "axios"

import useAuthStore from "../store/useAuthStore"
import useShowToast from "./useShowToast"

const useLogout = () => {
    const { setAuthUser } = useAuthStore()
    const { showToast } = useShowToast()
    const handleLogout = async () => {

        await axios.post(`https://full-stack-social-media-pq4h.onrender.com/api/auth/logout`)
        setAuthUser(null)
        localStorage.removeItem("authUser")
        showToast({
            title: "success",
            description: "logout successfully",
            status: "success",
            duration: 5000,
            isClosable: true
        })

    }
    return { handleLogout }
}
export default useLogout