import { Avatar, Box, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import useConversation from "../../store/useConversation";
import { useSocketContext } from "../../context/SocketContext"
import { getRandomEmoji } from "../../constants/emojis";

const Conversation = ({ conversation, lastID }) => {
    const { onlineUsers } = useSocketContext()
    const { selectedConversation, setSelectedConversation } = useConversation()
    const isSelected = selectedConversation?._id === conversation._id;
    const isOnline = onlineUsers.includes(conversation._id)
    const handleAddCoversation = (conversation) => {

        setSelectedConversation(conversation)
    }
    return (
        <VStack cursor={"pointer"} p={2} rounded={"xl"} bg={isSelected ? "gray.300" : ""} onClick={() => handleAddCoversation(conversation)} w={"100%"} justify={"start"} align={"start"}>
            <HStack gap={4} justify={"space-between"} align={"start"} w={"full"}>
                <HStack w={"full"}>
                    <Avatar src={conversation?.profilePic} />
                    <VStack justify={"start"} align={"start"}>
                        <Text>{conversation.fullname}</Text>
                        <HStack>
                            <Text h={2} w={2} rounded={"100%"} bg={isOnline ? "green.400" : "red.400"} fontSize={"x-small"}></Text>
                            <Text fontSize={"xs"}>{isOnline ? "Online" : "Offline"}</Text>
                        </HStack>
                    </VStack>
                </HStack>
                <Box>
                    {getRandomEmoji()}
                </Box>
            </HStack>
            {
                !lastID && <Divider />
            }

        </VStack>
    )
}
export default Conversation