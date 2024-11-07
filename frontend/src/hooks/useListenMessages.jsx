import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	 
	const {selectedConversation, messages, setMessages } = useConversation();
     
	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
		  // Play notification sound for the new message
		  const sound = new Audio(notificationSound);
		  sound.play();
	
		  // Only update the messages if the new message is part of the selected conversation
		  if (selectedConversation?._id === newMessage?.conversationId) {
			// Use functional update to get the latest state of messages
			setMessages((prevMessages) => {
			  // Prevent adding the same message multiple times
			  if (!prevMessages.some((msg) => msg._id === newMessage._id)) {
				return [...prevMessages, newMessage]; // Append the new message to the array
			  }
			  return prevMessages; // If the message already exists, return the previous state
			});
		  }
		});
	
		return () => socket?.off("newMessage"); // Cleanup socket listener on unmount
	  }, [socket, selectedConversation, setMessages]);
	
	};
export default useListenMessages;