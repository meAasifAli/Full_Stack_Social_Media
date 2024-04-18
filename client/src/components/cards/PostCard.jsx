import { Avatar, Box, Divider, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import ModalComponent from "../modal/Modal"
import { BsThreeDots } from "react-icons/bs"
import useAuthStore from "../../store/useAuthStore"
import useLikeUnlikePost from "../../hooks/useLikeUnlikePost"
import useDeletePost from "../../hooks/useDeletePost"

const PostCard = ({ post }) => {
    const { handleDeletePost } = useDeletePost()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { authUser } = useAuthStore()
    const { handleLikeUnlikePost } = useLikeUnlikePost()

    const deletePost = async () => {
        await handleDeletePost(post?._id)
    }
    return (
        <HStack w={"100%"} h={"100%"} justify={"space-between"} align={"start"} overflow={"auto"}>
            <Box display={"flex"} w={"100%"} flexDir={"row"} justifyContent={"start"} alignItems={"start"} gap={[2, 4]}>
                <Flex>
                    <Avatar onClick={() => navigate(`/${post?.postedBy._id}`)} size={"md"} src={post?.postedBy?.profilePic} />
                </Flex>
                <VStack justify={"start"} align={"start"} gap={4} w={"100%"}>
                    <Text fontWeight={"500"}>{post?.postedBy?.fullname}</Text>
                    <Text fontSize={"small"} fontWeight={"400"} color={"gray"}>{post?.text}</Text>
                    {post?.photo && <Image height={[200, 300]} width={[200, 300]} src={post?.photo} />}
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

                </VStack>
            </Box>

            <Menu>
                <MenuButton> <BsThreeDots size={20} /></MenuButton>
                <Portal>
                    <MenuList bg={"crimson"}>
                        <MenuItem bg={"crimson"} onClick={() => navigate(`/edit/${post._id}`)}>Edit</MenuItem>
                        <Divider bg={"gray"} orientation="horizontal" w={"full"} />
                        <MenuItem onClick={() => deletePost(post?._id)} bg={"crimson"}>Delete</MenuItem>
                        <Divider bg={"gray"} orientation="horizontal" w={"full"} />
                        <MenuItem bg={"crimson"} onClick={() => navigate(`/post/${post._id}`)}>Post Detail</MenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </HStack>
    )
}
export default PostCard