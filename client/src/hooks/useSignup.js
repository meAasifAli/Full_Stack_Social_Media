import { useState } from "react"
import useShowToast from "./useShowToast"
import axios from "axios"
import { AUTH_BASE_URL } from '../constants/index'
import useAuthStore from "../store/useAuthStore"

const useSignup = () => {
    const { showToast } = useShowToast()
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthStore()

    const handleSignup = async (inputs) => {
        setLoading(true)

        if (!inputs) {
            setLoading(false)
            showToast({
                title: "error",
                description: "Please fill all the fields",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
                status: "error",
            })
            return
        }

        try {
            const res = await axios.post(`${AUTH_BASE_URL}/signup`, inputs)

            if (res?.status === 201) {
                setAuthUser(res?.data)
                localStorage?.setItem("authUser", JSON.stringify(res?.data))

                showToast({
                    title: "Successful",
                    description: "Signup Success",
                    isClosable: true,
                    duration: 5000,
                    position: "bottom-right",
                    status: "success"
                })
            }
        } catch (error) {
            setLoading(false)
            showToast({
                description: error?.response?.data?.error,
                title: "error",
                duration: 5000,
                position: "bottom-right",
                isClosable: true,
                status: "error"
            })
            // console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, handleSignup }
}
export default useSignup