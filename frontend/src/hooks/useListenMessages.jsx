// useListenMessages.js
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, messages, setMessages, setTypingStatus } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            if (selectedConversation?._id === newMessage?.conversationId) {
                // Check for duplicates by ID (assuming messages have unique IDs)
                if (!messages.some(message => message._id === newMessage._id)) {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
                const sound = new Audio(notificationSound);
                sound.play();
            }
        };

        socket?.on("newMessage", handleNewMessage);

        socket?.on("typing", (data) => {
            if (selectedConversation?._id === data.conversationId) {
                setTypingStatus(true);
            }
        });

        socket?.on("stopTyping", (data) => {
            if (selectedConversation?._id === data.conversationId) {
                setTypingStatus(false);
            }
        });

        return () => {
            socket?.off("newMessage", handleNewMessage);
            socket?.off("typing");
            socket?.off("stopTyping");
        };
    }, [socket, selectedConversation, setMessages, setTypingStatus, messages]);

    return null; // Optional, as this is just a hook
};

export default useListenMessages;
