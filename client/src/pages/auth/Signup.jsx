import { Button, Container, FormControl, FormLabel, HStack, Image, Input, InputGroup, InputRightElement, Spinner, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useSignup from "../../hooks/useSignup";
import Logo from "../../components/logo/Logo";

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

        <Container maxW={'container.lg'}>
            <VStack h={"100vh"} w={"100%"} justifyContent={"center"} alignItems={"center"}>
                <VStack boxShadow={['none', "lg"]} bg={useColorModeValue("white", "gray.dark")} gap={4} rounded={"lg"} p={[4, 8]} w={["100%", "50%"]}>
                    <Logo color={useColorModeValue("black", "white")} />
                    <Text fontSize={"medium"} fontWeight={"bold"}>Create Your Account Now</Text>
                    <FormControl>
                        <FormLabel>username</FormLabel>
                        <Input
                            value={inputs?.username}
                            onChange={(ev) => setInputs({ ...inputs, username: ev.target.value })}
                            type='text'
                            placeholder="username"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>fullname</FormLabel>
                        <Input
                            value={inputs?.fullname}
                            onChange={(ev) => setInputs({ ...inputs, fullname: ev.target.value })}
                            type='text'
                            placeholder="fullname"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            value={inputs?.email}
                            onChange={(ev) => setInputs({ ...inputs, email: ev.target.value })}
                            type='email'
                            placeholder="email address"
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
                    <Button onClick={handleSubmit} type="submit" w={"100%"} mt={4} fontWeight={'400'} fontSize={'medium'} variant={'outline'}>{
                        loading ? <Spinner size={"sm"} /> : "Signup"
                    }</Button>
                    <HStack p={1} border={'1px solid grey'} w={'100%'} rounded={'lg'} justify={'center'}>

                        <Image
                            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                            h={'30px'}
                            w={'30px'}
                            objectFit={"contain"}
                        />
                        <Text>Continue with Google</Text>
                    </HStack>
                    <Text fontSize={"small"} fontWeight={'500'}>Already Have an Account? <Link to={"/login"}>Login</Link></Text>
                </VStack>
            </VStack>
        </Container>

    )
}
export default Signup