// useListenMessages.js
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, setMessages, setTypingStatus } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            if (selectedConversation?._id === newMessage?.conversationId) {
                setMessages((prevMessages) => {
                    // Ensure the message isn't already present to avoid duplicates
                    const isMessageAlreadyPresent = prevMessages.some(message => message._id === newMessage._id);
                    if (!isMessageAlreadyPresent) {
                        return [...prevMessages, newMessage];
                    }
                    return prevMessages;
                });

                // Play notification sound
                const sound = new Audio(notificationSound);
                sound.play();
            }
        };

        // Listen for new incoming messages
        socket?.on("newMessage", handleNewMessage);

        // Listen for typing events
        socket?.on("typing", (data) => {
            if (selectedConversation?._id === data.conversationId) {
                setTypingStatus(true);
            }
        });

        // Listen for stop typing events
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
    }, [socket, selectedConversation, setMessages, setTypingStatus]);

    return null;
};

export default useListenMessages;
