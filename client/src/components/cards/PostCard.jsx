import { Avatar, Box, Divider, Flex, HStack, Image, Input, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import ModalComponent from "../modal/Modal"
import { BsThreeDots } from "react-icons/bs"
import useAuthStore from "../../store/useAuthStore"
import useLikeUnlikePost from "../../hooks/useLikeUnlikePost"
import useDeletePost from "../../hooks/useDeletePost"
import { getDate } from "../../constants/utility"

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
        <HStack w={"100%"} h={"100%"} justify={"space-between"} align={"start"} p={[2, 6]}>
            <Box display={"flex"} w={"100%"} flexDir={"row"} justifyContent={"start"} alignItems={"start"} gap={[4, 6]}>
                <Flex>
                    <Avatar onClick={() => navigate(`/${post?.postedBy._id}`)} size={"md"} src={post?.postedBy?.profilePic} />
                </Flex>
                <VStack justify={"start"} align={"start"} w={"100%"}>
                    <Text fontWeight={"500"}>{post?.postedBy?.fullname}</Text>
                    <Text fontSize={'small'} fontWeight={"300"}>{getDate(post?.createdAt)}</Text>
                    <Text fontSize={"medium"} fontWeight={"400"} color={"GrayText"} py={2}>{post?.text}</Text>
                    {post?.photo && <Image height={["100%", 300]} width={["100%", 300]} src={post?.photo} objectFit={"cover"} />}
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
                    <Text>{post?.comments?.length > 0 && "View all comments"}</Text>

                    <Input
                        placeholder="Add your comment"
                        variant={"flushed"}
                    />


                </VStack>
            </Box>

            <Menu>
                <MenuButton>
                    <BsThreeDots size={20} />
                </MenuButton>
                <Portal>
                    <MenuList >
                        <MenuItem onClick={() => navigate(`/edit/${post._id}`)}>Edit</MenuItem>
                        <Divider bg={"gray"} orientation="horizontal" w={"full"} />
                        <MenuItem onClick={() => deletePost(post?._id)} >Delete</MenuItem>
                        <Divider bg={"gray"} orientation="horizontal" w={"full"} />
                        <MenuItem onClick={() => navigate(`/post/${post._id}`)}>Post Detail</MenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </HStack>
    )
}
export default PostCard