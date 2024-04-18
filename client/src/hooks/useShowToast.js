import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"

const useShowToast = () => {
    const toast = useToast()

    const showToast = useCallback(({ title, status, description, duration, isClosable, position }) => {
        toast({
            title: title,
            status: status,
            description: description,
            duration: duration,
            isClosable: isClosable,
            position: position
        })
    }, [toast])
    return { showToast }
}
export default useShowToast