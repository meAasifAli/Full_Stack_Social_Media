import { VStack, Text, Button, useDisclosure, Box, Image, Spinner, Flex, Container, } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import useAuthStore from '../../store/useAuthStore'
import ModalComponent from '../../components/modal/Modal'
import useGetSingleUser from '../../hooks/useGetSingleUser'

import { FaRegHeart } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import useFollowUnfollow from '../../hooks/useFollowUnfollow'
import ProfileCard from '../../components/cards/ProfileCard'

const Profile = () => {
    const { id } = useParams()
    const { handleFollowUnfollow } = useFollowUnfollow()
    const { authUser } = useAuthStore()
    const { userData, loading } = useGetSingleUser(id)

    const { isOpen, onOpen, onClose } = useDisclosure()
    return loading ? <Flex h={"100vh"} justifyContent={"center"} align={"center"}>
        <Spinner size={"xl"} />
    </Flex> : (
        <VStack justify={"start"} align={"start"} gap={4} w={"100%"} py={[4, 8]}>
            <Container maxW={"container.sm"}>
                <ProfileCard userData={userData} />
                <Text py={4} fontWeight={400} fontSize={"medium"}>{userData?.bio}</Text>
                {
                    authUser?._id === userData?._id ? <Button onClick={onOpen} w={"100%"} variant={"outline"} fontSize={"small"} fontWeight={"500"}>Edit Profile</Button> :
                        <Button onClick={() => handleFollowUnfollow(userData)} w={"100%"} >{userData?.followers?.includes(authUser._id) ? "Unfollow" : "Follow"}</Button>
                }
                <Box>
                    <ModalComponent
                        flag="isProfile"
                        title={"Edit Profile"}
                        isOpen={isOpen}
                        onClose={onClose}
                        authUser={authUser}
                    />
                </Box>
                <Tabs w={"100%"} >
                    <TabList w={"100%"}>
                        <Tab w={"100%"}>Posts</Tab>
                        <Tab w={"100%"}>Saved Posts</Tab>
                    </TabList>

                    <TabPanels w={"100%"}>
                        <TabPanel display={"flex"} flexDir={["column", "row"]} justifyContent={"start"} alignItems={"start"} w={"100%"}>
                            {
                                userData?.savedPosts?.map((item, id) => {
                                    return <VStack key={id} shadow={"lg"} pos={"relative"}>
                                        {
                                            item?.photo && <VStack p={2} w={["100%", "50%"]}>
                                                <Image src={item?.photo} height={"100px"} width={"150px"} />
                                                <Text fontSize={"small"} noOfLines={"2"}>{item?.text}</Text>
                                                <Box pos={"absolute"} top={2} right={2}>
                                                    <FaRegHeart />
                                                </Box>
                                            </VStack>
                                        }
                                    </VStack>
                                })
                            }
                        </TabPanel>
                        <TabPanel w={"100%"}>
                            <p>Saved Posts</p>
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Container>

        </VStack>

    )
}
export default Profile