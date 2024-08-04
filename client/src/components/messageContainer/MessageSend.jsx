import { Avatar, Button, HStack, Input, Spinner } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { FaImages } from "react-icons/fa6";
import usePreviewImg from "../../hooks/usePreviewImg";


const MessageSend = ({ loading, handleSendMessage }) => {
    const imgRef = useRef(null)
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
    const [text, setText] = useState("")


    const handleSubmit = async () => {
        await handleSendMessage({ text, image: imgUrl })
        setText("")
        setImgUrl("")
    }
    return (
        <HStack w={"100%"}>
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="type your message" />
            <Input ref={imgRef} onChange={handleImageChange} type="file" display={"none"} />
            {imgUrl ? <Avatar onClick={() => setImgUrl("")} src={imgUrl} size={"sm"} /> : <FaImages onClick={() => imgRef.current.click()} size={30} />}
            <Button onClick={handleSubmit} type="submit" bg={"gray.300"}>{loading ? <Spinner size={"sm"} /> : "Send"}</Button>
        </HStack>
    )
}
export default MessageSend