import { useEffect, useState } from 'react'
import axios from 'axios'


const useGetSingleUser = (userID) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchSingle = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:5000/api/user/${userID}`)
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