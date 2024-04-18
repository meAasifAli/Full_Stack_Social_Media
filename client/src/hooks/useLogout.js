import axios from "axios"
import { AUTH_BASE_URL } from "../constants"
import useAuthStore from "../store/useAuthStore"
import useShowToast from "./useShowToast"

const useLogout = () => {
    const { setAuthUser } = useAuthStore()
    const { showToast } = useShowToast()
    const handleLogout = async () => {

        await axios.post(`${AUTH_BASE_URL}/logout`)
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