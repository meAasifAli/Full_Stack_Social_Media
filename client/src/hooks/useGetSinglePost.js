import axios from "axios"
import { useEffect, useState } from "react"



const useGetSinglePost = (postID) => {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchSinglePost = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:5000/api/post/${postID}`)
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