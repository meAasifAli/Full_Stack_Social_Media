import { create } from 'zustand'


export const useAuthStore = create((set) => ({
    authUser: JSON.parse(localStorage?.getItem("authUser")) || null,
    setAuthUser: (authUser) => set({ authUser }),

}))

export default useAuthStore