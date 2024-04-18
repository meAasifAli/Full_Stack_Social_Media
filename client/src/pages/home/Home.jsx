import {
    Button,
    Center,
    Flex,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react"
import useGetPosts from '../../hooks/useGetPosts'
import usePostStore from "../../store/usePostStore"
import PostCard from "../../components/cards/PostCard";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate()
    const { loading } = useGetPosts()
    const { posts } = usePostStore()


    return loading ? <Center justify={"center"} align={"center"} h={"100vh"}>
        <Spinner color="blueviolet" size={"xl"} />
    </Center> : (
        <VStack overflow={"auto"} justify={"start"} align={"start"} gap={[12, 16]} w={"100%"} h={"100%"}>
            {
                posts?.map((post, id) => {
                    return (
                        <PostCard key={id} post={post} />
                    )
                })
            }
            {
                posts?.length === 0 && (
                    <Flex justify={"center"} flexDir={"column"} gap={2} align={"center"} h={"100vh"} w={"100%"}>
                        <Text fontSize={"25px"} color={"gray"}>No posts yet</Text>
                        <Text fontSize={"15px"} color={"gray"}>Be the first to create post</Text>
                        <Button onClick={() => navigate("/create")} bg={"crimson"}>Create</Button>
                    </Flex>
                )
            }
        </VStack>
    )
}
export default Home