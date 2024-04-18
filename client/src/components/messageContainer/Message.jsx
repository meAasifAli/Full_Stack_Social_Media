import { Image, Text, useColorMode, VStack } from "@chakra-ui/react"
import { format } from "date-fns"
import useAuthStore from "../../store/useAuthStore"

const Message = ({ msg }) => {
    const { authUser } = useAuthStore()
    const { colorMode } = useColorMode()
    return (
        <VStack w={"100%"} justify={msg?.senderID === authUser?._id ? "flex-end" : "flex-start"} align={msg?.senderID === authUser._id ? "flex-end" : "flex-start"}>
            <VStack justify={"end"} align={"end"} gap={0} bg={colorMode === "dark" ? msg?.senderID === authUser?._id ? "purple.500" : "gray.900" : msg?.senderID === authUser?._id ? "purple.500" : "gray.200"} px={4} rounded={"xl"}>
                <Text>{msg?.text}</Text>
                {msg?.image && <Image h={100} w={100} objectFit={"contain"} src={msg?.image} />}
                <Text textAlign={"end"} fontSize={"10px"}>{format(new Date(msg?.createdAt), "p")}</Text>
            </VStack>
        </VStack>
    )
}
export default Message