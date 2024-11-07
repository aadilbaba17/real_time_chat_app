// useConversation.js
import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    messages: [],
    setMessages: (messages) => set({ messages }),

    typingStatus: false, // New state to track typing status
    setTypingStatus: (status) => set({ typingStatus: status }) // New method to update typing status
}));

export default useConversation;
