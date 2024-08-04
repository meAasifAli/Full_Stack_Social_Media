import { VStack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <VStack w={"100%"} py={4}>
            <Outlet />
        </VStack>
    )
}
export default AuthLayout