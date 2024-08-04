import { useState } from 'react'
import useShowToast from './useShowToast'
import axios from 'axios'

import { useAuthStore } from '../store/useAuthStore'

const useUpdateProfile = (authUser) => {
    const { setAuthUser } = useAuthStore()
    const [loading, setLoading] = useState(false)
    const { showToast } = useShowToast()

    const handleUpdateProfile = async (inputs) => {
        setLoading(true)
        try {
            const res = await axios.put(`http://localhost:5000/api/user/update/${authUser._id}`, inputs)
            if (res?.status === 200) {
                setAuthUser(res?.data)
                localStorage?.setItem("authUser", JSON.stringify(res?.data))

                if (res?.status === 200) {
                    showToast({
                        title: "Successful",
                        description: "user Profile Updated Successfully",
                        isClosable: true,
                        duration: 5000,
                        position: "bottom-right",
                        status: "success"
                    })
                    window?.location.reload()
                }
            }
        } catch (error) {
            setLoading(false)
            showToast({
                title: "error",
                description: error?.message,
                status: "error",
                isClosable: true,
                duration: 5000
            })
        }
        finally {
            setLoading(false)
        }

    }
    return { handleUpdateProfile, loading }
}
export default useUpdateProfile