import axios from "axios"
import { useEffect, useState } from "react"



const useGetSinglePost = (postID) => {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchSinglePost = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`https://full-stack-social-media-pq4h.onrender.com/api/post/${postID}`)
                console.log(res?.data);
                setPost(res?.data)

            } catch (error) {
                console.log(error);
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        fetchSinglePost()
    }, [setPost, postID])


    return { loading, post }
}
export default useGetSinglePost