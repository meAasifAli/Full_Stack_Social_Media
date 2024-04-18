import { Button, Flex, Heading, Image, Input, Spinner, VStack } from "@chakra-ui/react"
import useGetSinglePost from "../../hooks/useGetSinglePost"
import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { FaLink } from "react-icons/fa6";
import usePreviewImg from "../../hooks/usePreviewImg";
import useUpdatePost from "../../hooks/useUpdatePost"


const EditPost = () => {
    const { loading: updateLoader, handleUpdatePost } = useUpdatePost()
    const fileRef = useRef(null)
    const { handleImageChange, setImgUrl, imgUrl } = usePreviewImg()
    const [text, setText] = useState("")
    const { postID } = useParams()
    const { post, loading } = useGetSinglePost(postID)

    useEffect(() => {
        setText(post?.text)
        setImgUrl(post?.photo)
    }, [postID, post?.text, post?.photo, setImgUrl])

    const handleClick = async () => {
        await handleUpdatePost(postID, { text, photo: imgUrl })
    }
    return loading ? <Flex h="100vh" justify={"center"} align={"center"} w={"100%"}>
        <Spinner size={"xl"} />
    </Flex> : (
        <VStack justify="start" align={"start"} gap={4} w={["100%", "50%"]}>
            <Heading>Edit Post</Heading>
            {
                imgUrl && <Flex justify={"center"} align={"center"}>
                    <Image src={post?.image || imgUrl} alt="" />
                </Flex>
            }
            <Input
                py={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Input type="file" ref={fileRef} onChange={handleImageChange} display={"none"} />
            <FaLink onClick={() => fileRef.current.click()} color="crimson" size={20} />
            <Button bg={"crimson"} w={"100%"} onClick={handleClick}>
                {
                    updateLoader ? <Spinner size={"sm"} /> : "Update"
                }
            </Button>
        </VStack>
    )
}
export default EditPost