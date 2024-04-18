import { create } from 'zustand'


const useMsgStore = create((set) => ({
    messages: [],
    setMessages: (messages) => set(() => ({ messages })),
}))

export default useMsgStore