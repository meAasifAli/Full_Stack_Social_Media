import { Flex, useColorModeValue, VStack } from "@chakra-ui/react"
import SideBar from "../../components/sidebar/SideBar"
import Container from "../../components/messageContainer/Container"

const Main = () => {
    return (
        <Flex flex={1} flexDir={["column", "row"]} justify={"center"} align={"center"} shadow={"lg"} rounded={"lg"} w={"full"} bg={useColorModeValue("white", "black")} h={["50vh", "100vh"]} overflow={"hidden"}>
            <VStack mt={[4, 0]} overflowY={"scroll"} bg={useColorModeValue("white", "gray.900")} p={[2, 4]} borderRight={["none", "1px solid gray"]} flex={[1, 0.3]} justify={"start"} align={"start"} h={["50vh", "100vh"]}>
                <SideBar />
            </VStack>

            <VStack p={4} h={["50vh", "100vh"]} justify={"start"} align={"start"} flex={[1, 0.7]}>
                <Container />
            </VStack>
        </Flex>
    )
}
export default Main