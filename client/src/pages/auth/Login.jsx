import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Spinner, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"


const Login = () => {
    const { loading, handleLogin } = useLogin()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        await handleLogin(inputs)
    }
    return (
        <VStack h={"100vh"} w={"100%"} justifyContent={"center"} alignItems={"center"}>
            <VStack boxShadow={"lg"} bg={useColorModeValue("white", "gray.dark")} gap={4} rounded={"lg"} p={[4, 12]} w={["100%", "50%"]}>
                <Text fontSize={"medium"} fontWeight={"bold"}>Login to Your Account Now</Text>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="Enter email"
                        value={inputs?.email}
                        onChange={(ev) => setInputs({ ...inputs, email: ev.target.value })}
                        type='email'
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'

                            value={inputs.password}
                            onChange={(ev) => setInputs({ ...inputs, password: ev.target.value })}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button onClick={handleSubmit} type="submit" w={"100%"} bg="crimson">{
                    loading ? <Spinner size={"sm"} /> : "Login"
                }</Button>
                <Text>Doesn&apos;t Have an Account? <Link to={"/signup"}>signup</Link></Text>
            </VStack>
        </VStack>
    )
}
export default Login