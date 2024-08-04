import { SearchIcon } from "@chakra-ui/icons"
import { Avatar, Button, HStack, IconButton, Input, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import useGetConversations from "../../hooks/useGetConversations"
import useConversationStore from "../../store/useConversation"
import useAuthStore from "../../store/useAuthStore"
import useFollowUnfollow from "../../hooks/useFollowUnfollow"
import { useNavigate } from "react-router-dom"
import useGetSingleUser from "../../hooks/useGetSingleUser"


const Filter = () => {
    const { authUser } = useAuthStore()
    useGetConversations()
    const { conversations } = useConversationStore()
    const { handleFollowUnfollow } = useFollowUnfollow()
    const navigate = useNavigate()
    const { userData } = useGetSingleUser(authUser._id)
    return (
        <Stack p={4} flexDir={"column"} overflow={"auto"} h={"100vh"}>
            <HStack w={"100%"} py={4}>
                <Input type="search" placeholder="search for a post" />
                <IconButton rounded={"100%"} bg={useColorModeValue("gray.200", "gray.dark")}>
                    <SearchIcon />
                </IconButton>
            </HStack>
            <Stack justify={"start"} align={"start"} pb={4}>
                <Text fontSize={"medium"} fontWeight={"400"}>Users You might be interested in</Text>
            </Stack>
            <Stack id="filter-scroll" overflow={"auto"} flexDir={"column"} justify={"start"} align={"start"} gap={4}>
                {
                    conversations.map((item, id) => {
                        return (
                            <Stack cursor={"pointer"} w={'100%'} flexDir={"row"} justify={"space-between"} align={"center"} key={id} gap={6}>
                                <HStack align={"start"} justify={"start"} gap={4}>
                                    <Avatar onClick={() => navigate(`/${item?._id}`)} src={item?.profilePic} />
                                    <VStack justify={"start"} align={"start"}>
                                        <Text fontSize={"medium"} fontWeight={"400"}>{item?.username}</Text>
                                        <Text fontSize={"small"} fontWeight={"300"}>{item?.followers?.length} followers</Text>
                                    </VStack>
                                </HStack>
                                <Button onClick={() => handleFollowUnfollow(item)} fontSize={"small"} fontWeight={"400"} variant={'outline'} size={'sm'}>
                                    {
                                        userData?.following?.includes(item?._id) ? "Unfollow" : "Follow"
                                    }
                                </Button>
                            </Stack>
                        )
                    })
                }
            </Stack>
        </Stack>
    )
}
export default Filter