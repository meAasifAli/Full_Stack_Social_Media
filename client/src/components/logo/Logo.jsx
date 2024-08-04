import { HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { FaShareAlt } from "react-icons/fa"

const Logo = (color1, color2) => {

    return (
        <HStack gap={2} >
            <FaShareAlt size={24} color="blue" />
            <Text fontSize={"large"} fontWeight={"500"} color={useColorModeValue(color1, color2)}>ShareFun</Text>
        </HStack>
    )
}
export default Logo