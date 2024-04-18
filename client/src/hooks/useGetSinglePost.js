import axios from "axios"
import { useEffect, useState } from "react"
import { POST_BASE_URL } from "../constants"


const useGetSinglePost = (postID) => {
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchSinglePost = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${POST_BASE_URL}/${postID}`)
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