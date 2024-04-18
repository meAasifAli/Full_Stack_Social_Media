import { Avatar, HStack, Text, VStack } from "@chakra-ui/react"

const Header = ({ selectedConversation }) => {
    return (
        <HStack p={2} rounded={"lg"} bg={"purple.500"} w={"100%"}>
            <Avatar size={"md"} src={selectedConversation?.profilePic} />
            <VStack justify={"start"} align={"start"}>
                <Text>{selectedConversation?.fullname}</Text>
                <Text fontSize={"x-small"}>online</Text>
            </VStack>
        </HStack>
    )
}
export default Header