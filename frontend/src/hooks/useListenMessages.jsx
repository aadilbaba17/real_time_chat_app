import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	 
	const {selectedConversation, messages, setMessages } = useConversation();

	useEffect(() => {
		// Listen for new messages from the socket server
		socket?.on("newMessage", (newMessage) => {
			// Play notification sound for new message
			const sound = new Audio(notificationSound);
			sound.play();

			// If the new message is from the selected conversation
			if (selectedConversation?._id === newMessage?.senderId || selectedConversation?._id === newMessage?.receiverId) {
				// Check if the message already exists in the messages list
				const messageExists = messages.some((msg) => msg._id === newMessage._id);
				
				// If the message does not already exist, add it to the messages state
				if (!messageExists) {
					// Update the messages list with the new message (preserving previous messages)
					setMessages((prevMessages) => [...prevMessages, newMessage]);
				}
			}
		});

		// Clean up the socket listener on component unmount or when dependencies change
		return () => socket?.off("newMessage");
	}, [socket, selectedConversation, messages, setMessages]);
};
export default useListenMessages;