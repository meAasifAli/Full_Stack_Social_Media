
import { useEffect, useState } from 'react'
import axios from 'axios'

import usePostStore from '../store/usePostStore'

const useGetPosts = () => {
    const { setPosts } = usePostStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`https://full-stack-social-media-pq4h.onrender.com/api/post`)
                if (res?.status === 200) {
                    setPosts(res?.data)
                }
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [setPosts])
    return { loading }
}
export default useGetPosts