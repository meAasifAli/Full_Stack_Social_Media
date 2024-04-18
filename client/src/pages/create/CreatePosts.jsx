import { Text, VStack, Textarea, Button, Input, Image, Spinner } from "@chakra-ui/react"
import { useRef, useState } from "react";
import { GoLink } from "react-icons/go";
import usePreveiwImg from "../../hooks/usePreviewImg"
import useCreatePost from "../../hooks/useCreatePost";


const CreatePosts = () => {
    const [text, setText] = useState("")
    const fileRef = useRef(null)
    const { handleImageChange, imgUrl, } = usePreveiwImg()
    const { handleCreatePost, loading } = useCreatePost()

    const handleClick = async (ev) => {
        ev.preventDefault()
        await handleCreatePost({ photo: imgUrl, text })
    }
    return (
        <VStack overflow={"auto"} w={"100%"} py={4} gap={4} justify={"start"} align={"start"}>
            <Text textAlign={"center"} fontWeight={"bold"}>Create a new Post</Text>

            {
                imgUrl &&
                <Image src={imgUrl} h={"50vh"} w={"100%"} objectFit={"contain"} />
            }

            <Textarea
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                placeholder="What's on your mind?" />
            <GoLink onClick={() => fileRef.current.click()} size={20} />
            <Input ref={fileRef} onChange={handleImageChange} type="file" display={"none"} />
            <Button onClick={handleClick} type="submit" w={"100%"} bg={"crimson"}>
                {loading ? <Spinner size={"sm"} /> : "Post"}
            </Button>
        </VStack>
    )
}
export default CreatePosts