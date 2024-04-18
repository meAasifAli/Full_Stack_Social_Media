import { useEffect, useState } from 'react'
import axios from 'axios'
import { USER_BASE_URL } from "../constants/index"

const useGetSingleUser = (userID) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchSingle = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${USER_BASE_URL}/${userID}`)
                if (res.status === 200) {
                    setUserData(res?.data)
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        fetchSingle()

    }, [userID])
    return { userData, loading }
}
export default useGetSingleUser