import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import Header from "./Header"
import useConversation from '../../store/useConversation'
import MessageContainer from "./MessageContainer"
import MessageSend from "./MessageSend"
import useSendMessage from "../../hooks/useSendMessage"
import useGetMessages from "../../hooks/useGetMessages"

const Container = () => {
    const { selectedConversation } = useConversation()

    const { loading, handleSendMessage } = useSendMessage(selectedConversation?._id)

    const { loading: msgLoader } = useGetMessages(selectedConversation?._id)

    return selectedConversation === null ? <Flex flexDir={"column"} h={"100%"} w={"100%"} justify={"center"} align={"center"}>
        <Text>🗨️No Conversation Selected</Text>
        <Text color={"gray"} fontSize={"x-small"}>Select any conversation to get started</Text>
    </Flex> : (
        <VStack w={"100%"} h={["100vh", "100%"]}>
            <Box w={"100%"}>
                <Header selectedConversation={selectedConversation} />
            </Box>
            <MessageContainer msgLoader={msgLoader} />
            <MessageSend loading={loading} handleSendMessage={handleSendMessage} />
        </VStack>
    )
}
export default Container