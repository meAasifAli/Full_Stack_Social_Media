import { useState } from "react"
import useShowToast from "./useShowToast"
import axios from "axios"

import useAuthStore from "../store/useAuthStore"

const useLogin = () => {
    const { setAuthUser } = useAuthStore()
    const { showToast } = useShowToast()
    const [loading, setLoading] = useState(false)

    const handleLogin = async (inputs) => {
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/login`, inputs)
            if (res?.status === 200) {
                setAuthUser(res?.data)
                localStorage?.setItem("authUser", JSON.stringify(res?.data))

                showToast({
                    title: "Successful",
                    description: "Login Success",
                    isClosable: true,
                    duration: 5000,
                    position: "bottom-right",
                    status: "success"
                })
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
    return { loading, handleLogin }
}
export default useLogin