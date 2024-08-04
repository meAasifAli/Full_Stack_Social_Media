import { Box, HStack, IconButton, Stack, Text, useColorMode, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react"
import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/header/Header"
import { BiMenuAltRight } from "react-icons/bi";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { useRef } from "react";
import Logo from "../components/logo/Logo";
import { CiHome } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { PiMessengerLogo } from "react-icons/pi";
import { LuPenSquare, LuSunMoon } from "react-icons/lu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiMoon } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import useAuthStore from "../store/useAuthStore";

const MainLayout = () => {
    const { authUser } = useAuthStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const { colorMode, toggleColorMode } = useColorMode()
    const { handleLogout } = useLogout()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        await handleLogout()
    }
    return (
        <Stack flexDir={["column", "row"]} w={"100%"} justify={'start'} align={'start'} h={'100vh'}>
            <Box flex={[1, 0.2]} h={'100vh'} overflow={'hidden'} display={["none", "flex"]}>
                <Header />
            </Box>
            <Box onClick={onOpen} display={["flex", "none"]} justifyContent={"end"} alignItems={"end"} w="100%" p={4} bg={useColorModeValue("white", "black")}>
                <BiMenuAltRight on size={30} />
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Logo />
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack align={'start'} w={'100%'} h={'100vh'}>
                            <VStack justify={'start'} align={'start'} w={'100%'}>

                                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate("/")} rounded={"lg"} w={'100%'} p={2} justify={"start"} align={"start"}>
                                    <CiHome size={20} color="black" />
                                    <Text color={'black'}>Home</Text>
                                </HStack>

                                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate(`/${authUser._id}`)} w={'100%'} p={2} rounded={"lg"} >
                                    <IoPersonOutline size={20} color="black" />
                                    <Text color={'black'}>Profile</Text>
                                </HStack>

                                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate(`/messenger`)} w={'100%'} p={2} rounded={"lg"} >
                                    <PiMessengerLogo size={20} color="black" />
                                    <Text color={'black'}>Messenger</Text>
                                </HStack>

                                <HStack _hover={{ bg: useColorModeValue('gray.600', 'gray.dark'), w: "100%" }} cursor={'pointer'} onClick={() => navigate(`/create`)} w={'100%'} p={2} rounded={"lg"} >
                                    <LuPenSquare size={20} color="black" />
                                    <Text color={'black'}>Create Post</Text>
                                </HStack>
                                <HStack cursor={"pointer"} onClick={toggleColorMode}>
                                    <IconButton rounded={"100%"} >
                                        {
                                            colorMode === "light" ? <FiMoon size={20} /> :
                                                <LuSunMoon size={20} />
                                        }
                                    </IconButton>
                                    <Text>Theme</Text>
                                </HStack>
                                <HStack cursor={"pointer"} onClick={handleSubmit}>
                                    <IconButton rounded={"100%"} >
                                        <RiLogoutCircleRLine size={20} />
                                    </IconButton>
                                    <Text>Signout</Text>
                                </HStack>
                            </VStack>


                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box flex={[1, 0.8]} h={'100vh'}>
                <Outlet />
            </Box>

        </Stack>
    )
}
export default MainLayout