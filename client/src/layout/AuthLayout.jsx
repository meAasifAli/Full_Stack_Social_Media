import { VStack } from "@chakra-ui/react"
import AuthHeader from "../components/header/AuthHeader"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <VStack w={"100%"} py={4}>
            <AuthHeader />
            <Outlet />
        </VStack>
    )
}
export default AuthLayout