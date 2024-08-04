import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Textarea,
    Spinner,
    HStack,
    VStack,
    Text,
    Flex,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'
import usePreviewImg from '../../hooks/usePreviewImg'
import useUpdateProfile from '../../hooks/useUpdateProfile'
import useCommentPost from '../../hooks/useCommentPost'
import { MdOutlineDelete } from "react-icons/md";
import useDeleteComment from '../../hooks/useDeleteComment'


const ModalComponent = ({ isOpen, onClose, title, authUser, flag, post }) => {
    const { handleDeleteComment } = useDeleteComment()
    const [text, setText] = useState("")
    const { loading: commentLoader, handleAddComment } = useCommentPost()
    // console.log(authUser);
    const { handleUpdateProfile, loading } = useUpdateProfile(authUser)
    const fileRef = useRef(null)
    const [inputs, setInputs] = useState({
        username: "",
        fullname: "",
        email: "",
        bio: ""
    })
    const { setImgUrl, handleImageChange, imgUrl } = usePreviewImg()
    useEffect(() => {
        if (authUser) {
            setInputs({
                username: authUser.username,
                fullname: authUser.fullname,
                email: authUser.email,
                bio: authUser.bio
            })
            setImgUrl(authUser.profilePic)
        }
    }, [authUser, setImgUrl])


    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleUpdateProfile({ ...inputs, profilePic: imgUrl })
        onClose()
    }

    const handleComment = async () => {
        await handleAddComment(post._id, text)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent overflow={"auto"} w={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"100%"}>
                    {
                        flag === "isProfile" ?
                            <Stack
                                spacing={4}
                                w={'full'}
                                maxW={'md'}
                                bg={useColorModeValue('white', 'gray.dark')}
                                rounded={'xl'}
                                boxShadow={'lg'}
                                p={6}>
                                <FormControl id="userName">
                                    <Stack direction={['column', 'row']} spacing={6}>
                                        <Center>
                                            <Avatar size="xl" src={imgUrl || authUser?.profilePic}>
                                                <AvatarBadge
                                                    onClick={() => setImgUrl("")}
                                                    as={IconButton}
                                                    size="sm"
                                                    rounded="full"
                                                    top="-10px"
                                                    aria-label="remove Image"
                                                    icon={<SmallCloseIcon />}
                                                />
                                            </Avatar>
                                        </Center>
                                        <Center w="full">
                                            <Input ref={fileRef} type='file' display={"none"} onChange={handleImageChange} />
                                            <Button onClick={() => fileRef.current.click()} w="full">Change Profile</Button>
                                        </Center>
                                    </Stack>
                                </FormControl>
                                <FormControl id="userName" isRequired>
                                    <FormLabel>username</FormLabel>
                                    <Input
                                        value={inputs.username}
                                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                        placeholder="UserName"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl id="userName" isRequired>
                                    <FormLabel>fullname</FormLabel>
                                    <Input
                                        value={inputs.fullname}
                                        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                                        placeholder="fullname"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                    />
                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        value={inputs.email}
                                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                        placeholder="your-email@example.com"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="email"
                                    />
                                </FormControl>
                                <FormControl id="userName" isRequired>
                                    <FormLabel>bio</FormLabel>
                                    <Textarea
                                        value={inputs.bio}
                                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                                        placeholder="bio"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                    />
                                </FormControl>
                            </Stack>
                            :
                            <VStack gap={"4"} justify={"start"} align={"start"}>
                                <HStack w={"100%"}>
                                    <Input
                                        value={text}
                                        onChange={(ev) => setText(ev.target.value)}
                                        placeholder='Add Your Comment' />
                                    <Button onClick={handleComment}>
                                        {
                                            commentLoader ? <Spinner size={"sm"} /> : "Add"
                                        }
                                    </Button>
                                </HStack>
                                <VStack justify={"start"} align={"start"} gap={4}>
                                    {
                                        post?.comments?.map((item, id) => {
                                            return <HStack key={id} justify={"start"} align={"start"} gap={4}>
                                                <Avatar src={item?.commentedBy?.profilePic} size={"md"} />
                                                <VStack justify={"start"} align={"start"}>
                                                    <Text fontSize={"x-small"} fontWeight={"500"}>{item?.commentedBy?.fullname}</Text>
                                                    <HStack justify={"start"}>
                                                        <Text fontSize={"sm"}>{item?.text}</Text>
                                                        {item?.commentedBy?._id === authUser?._id && <MdOutlineDelete onClick={() => handleDeleteComment(item?._id)} color={"crimson"} size={15} />}
                                                    </HStack>
                                                </VStack>
                                            </HStack>
                                        })}
                                    {
                                        post?.comments?.length === 0 && <Flex>
                                            <Text fontSize={"x-small"} fontWeight={"500"}>No Comments</Text>
                                        </Flex>
                                    }
                                </VStack>
                            </VStack>
                    }
                </ModalBody>
                <ModalFooter>
                    {
                        flag === "isProfile" && <Button onClick={handleSubmit} type='submit' mr={3}>
                            {loading ? <Spinner size={"sm"} /> : "update"}
                        </Button>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default ModalComponent