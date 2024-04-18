import { VStack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
const MainLayout = () => {
    return (
        <VStack justify={"center"} align={"center"} w={"100%"}>
            <Header />
            <Outlet />
        </VStack>
    )
}
export default MainLayout