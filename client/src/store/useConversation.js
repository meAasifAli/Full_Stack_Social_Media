import { create } from 'zustand'


const useConversationStore = create((set) => ({
    conversations: [],
    setConversations: (conversations) => set({ conversations: conversations }),
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
}))

export default useConversationStore