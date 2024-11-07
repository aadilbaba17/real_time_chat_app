import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	 
	const {selectedConversation, messages, setMessages } = useConversation();
     
	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			if( selectedConversation?._id == newMessage?.senderId ||selectedConversation?._id == newMessage?.recieverId){
				const messageExists = messages.some((msg) => msg._id === newMessage._id);
          
				if (!messageExists) {
				  // Append the new message to the messages array
				  setMessages([...messages, newMessage]);
				};}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;