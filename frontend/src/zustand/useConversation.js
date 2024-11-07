// useConversation.js
import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    replyTo: null, // New state to track the message being replied to
    setReplyTo: (message) => set({ replyTo: message }), // Set the message to reply to
}));

export default useConversation;
