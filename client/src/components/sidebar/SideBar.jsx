import { Divider, HStack, IconButton, Input, Skeleton, VStack } from "@chakra-ui/react"
import { IoIosSearch } from "react-icons/io";
import useGetConversations from '../../hooks/useGetConversations'
import useConversation from "../../store/useConversation";
import Conversation from "./Conversation";
import { useState } from "react";

const SideBar = () => {
    const [search, setSearch] = useState("")
    const { loading } = useGetConversations()
    const { conversations, setSelectedConversation } = useConversation()
    // console.log(conversations);
    const handleSearch = (ev) => {
        ev.preventDefault()
        if (!search) return
        const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()))
        if (conversation) {
            setSelectedConversation(conversation)
            setSearch("")
        }
    }

    return loading ? <Skeleton /> : (
        <VStack gap={4} w={"100%"}>
            <HStack>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a Chat" />
                <IconButton onClick={handleSearch} rounded={"100%"}>
                    <IoIosSearch size={20} />
                </IconButton>
            </HStack>
            <Divider orientation="horizontal" />
            <VStack gap={4} py={4} justify={"start"} align={"start"} w={"100%"}>
                {
                    conversations?.map((conversation, index) => (
                        <Conversation
                            key={index}
                            conversation={conversation}
                            lastID={index === conversations.length - 1}
                        />
                    ))
                }
            </VStack>
        </VStack>
    )
}
export default SideBar