import {
    HStack,
    useColorMode, IconButton,
    useColorModeValue,
    useDisclosure, Text,
    Avatar, VStack,
    Stack,
    Menu,
    MenuList,
    MenuItem,
    Divider
} from "@chakra-ui/react"
import { FiMoon } from "react-icons/fi";
import { LuSunMoon } from "react-icons/lu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useLogout from "../../hooks/useLogout"
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { CiHome } from "react-icons/ci";
import { LuPenSquare } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import { PiMessengerLogo } from "react-icons/pi";
import { FaShareAlt } from "react-icons/fa";

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // console.log(pathname);
    const { authUser } = useAuthStore()
    const { userData } = useGetSingleUser(authUser?._id)
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode()
    const { handleLogout } = useLogout()

    const handleSubmit = async () => {
        await handleLogout()
    }
    return (
        <VStack justify={'space-between'} align={'start'} p={4} w={'100%'} bg={useColorModeValue("gray.800", "gray.dark")} h={'100vh'}>
            <VStack justify={'start'} align={'start'} w={'100%'}>
                <Stack mb={8}>
                    <HStack gap={2} >
                        <FaShareAlt size={24} color="blue" />
                        <Text fontSize={"large"} fontWeight={"500"} color={useColorModeValue('white', 'white')}>ShareFun</Text>
                    </HStack>
                </Stack>
                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate("/")} rounded={"lg"} w={'100%'} p={2} justify={"start"} align={"start"}>
                    <CiHome size={20} color="white" />
                    <Text color={'white'}>Home</Text>
                </HStack>
                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate(`/${authUser._id}`)} w={'100%'} p={2} rounded={"lg"} >
                    <IoPersonOutline size={20} color="white" />
                    <Text color={'white'}>Profile</Text>
                </HStack>
                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate(`/messenger`)} w={'100%'} p={2} rounded={"lg"} >
                    <PiMessengerLogo size={20} color="white" />
                    <Text color={'white'}>Messenger</Text>
                </HStack>
                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate(`/create`)} w={'100%'} p={2} rounded={"lg"} >
                    <LuPenSquare size={20} color="white" />
                    <Text color={'white'}>Create Post</Text>
                </HStack>

            </VStack>
            <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={onOpen} w={'100%'} p={2} rounded={"lg"} >
                <GiHamburgerMenu size={20} color="white" />
                <Text color={'white'}>More</Text>
            </HStack>

            <Menu bg={useColorModeValue("gray.600", "gray.dark")} onClose={onClose} isOpen={isOpen}>

                <MenuList bg={useColorModeValue("white", "gray.dark")}>
                    <HStack justify={"start"} align="start">
                        <Avatar size={"md"} src={userData?.profilePic} />
                        <VStack justify={"start"} align="start">
                            <Text fontSize={"12px"}>{userData?.fullname}</Text>
                            <Text fontSize={"12px"}>{userData?.email}</Text>
                        </VStack>
                    </HStack>
                    <Divider py={2} />
                    <MenuItem>
                        <HStack cursor={"pointer"} onClick={toggleColorMode}>
                            <IconButton rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                                {
                                    colorMode === "light" ? <FiMoon size={20} /> :
                                        <LuSunMoon size={20} />
                                }
                            </IconButton>
                            <Text>Theme</Text>
                        </HStack>
                    </MenuItem>
                    <MenuItem>
                        <HStack cursor={"pointer"} onClick={handleSubmit}>
                            <IconButton rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                                <RiLogoutCircleRLine size={20} />
                            </IconButton>
                            <Text>Signout</Text>
                        </HStack>
                    </MenuItem>
                </MenuList>


            </Menu>
        </VStack>
    )
}
export default Header