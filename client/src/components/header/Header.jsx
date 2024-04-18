import {
    HStack,
    useColorMode, IconButton,
    useColorModeValue, Drawer,
    useDisclosure, DrawerOverlay,
    DrawerContent, DrawerHeader,
    DrawerBody, Text,
    Avatar, VStack
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
import { FaFacebookMessenger } from "react-icons/fa";
import useGetSingleUser from "../../hooks/useGetSingleUser";


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
        <HStack justifyContent={"space-between"} align={"center"} py={4} w={"100%"}>

            <IconButton onClick={() => navigate("/")} rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                <CiHome size={20} />
            </IconButton>
            <IconButton onClick={() => navigate(`/${authUser._id}`)} rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                <IoPersonOutline size={20} />
            </IconButton>
            <IconButton onClick={() => navigate("/create")} rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                <LuPenSquare size={20} />
            </IconButton>

            <IconButton onClick={onOpen} rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                <GiHamburgerMenu size={20} />
            </IconButton>

            <Drawer bg={useColorModeValue("white", "gray.dark")} placement={"right"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={useColorModeValue("white", "gray.dark")}>
                    <DrawerHeader borderBottomWidth='1px'>
                        <HStack justify={"start"} align="start">
                            <Avatar size={"lg"} src={userData?.profilePic} />
                            <VStack justify={"start"} align="start">
                                <Text>{userData?.fullname}</Text>
                                <Text fontSize={"15px"}>{userData?.email}</Text>
                            </VStack>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody display={"flex"} flexDir={"column"} gap={[4, 6]} justifyContent={"start"} alignItems={"start"} bg={useColorModeValue("white", "gray.dark")}>
                        <HStack cursor={"pointer"} onClick={toggleColorMode}>
                            <IconButton rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                                {
                                    colorMode === "light" ? <FiMoon size={20} /> :
                                        <LuSunMoon size={20} />
                                }
                            </IconButton>
                            <Text>Theme</Text>
                        </HStack>

                        <HStack onClick={() => navigate("/messenger")} cursor={"pointer"}>
                            <IconButton rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                                <FaFacebookMessenger size={20} />
                            </IconButton>
                            <Text>Messenger</Text>
                        </HStack>

                        <HStack cursor={"pointer"} onClick={handleSubmit}>
                            <IconButton rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                                <RiLogoutCircleRLine size={20} />
                            </IconButton>
                            <Text>Signout</Text>
                        </HStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </HStack>
    )
}
export default Header