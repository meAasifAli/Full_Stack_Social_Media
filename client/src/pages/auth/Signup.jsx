import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Spinner, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useSignup from "../../hooks/useSignup";


const Signup = () => {
    const { loading, handleSignup } = useSignup()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [inputs, setInputs] = useState({
        username: "",
        fullname: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        await handleSignup(inputs)
    }
    return (
        <VStack h={"100vh"} w={"100%"} justifyContent={"center"} alignItems={"center"}>
            <VStack boxShadow={"lg"} bg={useColorModeValue("white", "gray.dark")} gap={4} rounded={"lg"} p={[4, 12]} w={["100%", "50%"]}>
                <Text fontSize={"medium"} fontWeight={"bold"}>Create Your Account Now</Text>
                <FormControl>
                    <FormLabel>username</FormLabel>
                    <Input
                        value={inputs?.username}
                        onChange={(ev) => setInputs({ ...inputs, username: ev.target.value })}
                        type='text'
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>fullname</FormLabel>
                    <Input
                        value={inputs?.fullname}
                        onChange={(ev) => setInputs({ ...inputs, fullname: ev.target.value })}
                        type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        value={inputs?.email}
                        onChange={(ev) => setInputs({ ...inputs, email: ev.target.value })}
                        type='email' />
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
                <Button onClick={handleSubmit} type="submit" w={"100%"} bg={"crimson"}>{
                    loading ? <Spinner size={"sm"} /> : "Signup"
                }</Button>
                <Text>Already Have an Account? <Link to={"/login"}>Login</Link></Text>
            </VStack>
        </VStack>
    )
}
export default Signup