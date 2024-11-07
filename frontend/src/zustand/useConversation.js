import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

	messages: [],
	setMessages: (messages) => set({ messages }),

	replyTo: null, // New state for the message being replied to
	setReplyTo: (message) => set({ replyTo: message }), // Setter to update the reply context
}));

export default useConversation;
