import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
}))

export default usePostStore