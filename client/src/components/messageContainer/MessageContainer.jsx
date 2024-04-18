import { Flex, Skeleton, VStack } from "@chakra-ui/react"
import Message from "./Message"
import useMsgStore from "../../store/useMsgStore"
import useListenMessages from "../../hooks/useListenMessages"
import { useEffect, useRef } from "react"

const MessageContainer = ({ msgLoader }) => {
    useListenMessages()
    const lastMsgRef = useRef();
    const { messages } = useMsgStore()
    // console.log(authUser);
    // console.log(messages);
    useEffect(() => {
        setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);
    return msgLoader ? <Skeleton /> : (
        <VStack flex={1} overflowY={"scroll"} justify={"start"} align={"start"} overflow={"auto"} w={"100%"}>
            {messages?.map((msg, id) => (
                <Flex ref={lastMsgRef} key={id} p={2} w={"100%"}>
                    <Message msg={msg} />
                </Flex>
            ))}
        </VStack>
    )
}
export default MessageContainer