import { Flex, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { FiMoon } from "react-icons/fi"
import { LuSunMoon } from "react-icons/lu"

const AuthHeader = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Flex justifyContent={"center"} align={"center"} w={"100%"}>
            <IconButton onClick={toggleColorMode} rounded={"100%"} bg={useColorModeValue("white", "gray.dark")}>
                {
                    colorMode === "light" ? <FiMoon size={20} /> :
                        <LuSunMoon size={20} />
                }
            </IconButton>
        </Flex>
    )
}
export default AuthHeader