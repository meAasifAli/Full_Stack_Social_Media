import { Avatar, HStack, Text, VStack } from "@chakra-ui/react"

const ProfileCard = ({ userData }) => {
    return (
        <HStack align={"flex-start"} gap={[4, 6]}>
            <Avatar size='xl' name={userData?.username} src={userData?.profilePic} />
            <VStack align={"flex-start"} justify={"start"} gap={1}>
                <Text fontSize='lg' fontWeight={"bold"}>{userData?.fullname}</Text>
                <Text fontSize='sm' fontWeight={"bold"}>{userData?.email}</Text>
                <HStack>
                    <Text fontSize='xs' color={"gray.500"}>{userData?.followers?.length} &middot; followers</Text>
                    <Text fontSize='xs' color={"gray.500"}>{userData?.following?.length} &middot; following</Text>
                </HStack>
                <Text fontSize='xs' color={"gray.500"}>{userData?.savedPosts?.length} &middot; Posts</Text>
            </VStack>
        </HStack>
    )
}
export default ProfileCard