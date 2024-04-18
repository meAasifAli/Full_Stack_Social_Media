import { Avatar, Box, Divider, Flex, HStack, Image, Spinner, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import useGetSinglePost from "../../hooks/useGetSinglePost"
import useLikeUnlikePost from "../../hooks/useLikeUnlikePost"
import useAuthStore from "../../store/useAuthStore"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"
import ModalComponent from "../../components/modal/Modal"



const PostDetail = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { authUser } = useAuthStore()
    const { handleLikeUnlikePost } = useLikeUnlikePost()
    const { postID } = useParams()

    const { loading, post } = useGetSinglePost(postID)


    return loading ? <Flex justify={"center"} align={"center"} h={"100vh"}>
        <Spinner size={"xl"} />
    </Flex> : (
        <VStack overflow={"auto"} justify={"start"} align={"start"} w={"100%"} gap={[4, 8]}>
            <Text color={"gray"}>{post?.text}</Text>
            {post?.photo && <Image src={post?.photo} />}
            <HStack py={2} gap={6}>
                <VStack>
                    <Flex onClick={() => handleLikeUnlikePost(post?._id)} cursor={"pointer"}>
                        {
                            post?.likes?.includes(authUser?._id) ? <FaHeart size={30} color={"crimson"} /> : <FaRegHeart size={30} />
                        }
                    </Flex>
                    <Text>{post?.likes?.length}</Text>
                </VStack>
                <VStack>
                    <FaRegComment onClick={onOpen} size={30} />
                    <Text>{post?.comments?.length}</Text>
                </VStack>
                <Box>
                    <ModalComponent
                        post={post}
                        flag="isComment"
                        title={"Add Comment"}
                        isOpen={isOpen}
                        onClose={onClose}
                        authUser={authUser}
                    />
                </Box>
            </HStack>
            <Divider orientation="horizontal" w={"full"} />
            <VStack>
                <Text fontWeight={"700"}>Comments</Text>
            </VStack>
            {
                post?.comments?.map((item, id) => {
                    return <HStack key={id} justify={"start"} align={"start"} gap={4}>
                        <Avatar src={item?.commentedBy?.profilePic} size={"md"} />
                        <VStack justify={"start"} align={"start"}>
                            <Text fontSize={"x-small"} fontWeight={"500"}>{item?.commentedBy?.fullname}</Text>
                            <Text fontSize={"sm"}>{item?.text}</Text>
                        </VStack>
                    </HStack>
                })}
            {
                post?.comments?.length === 0 && <Flex>
                    <Text fontSize={"x-small"} fontWeight={"500"}>No Comments</Text>
                </Flex>
            }
        </VStack>
    )
}
export default PostDetail