// useListenMessages.js
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, messages, setMessages, setTypingStatus } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();

            if (selectedConversation?._id === newMessage?.senderId) {
                setMessages([...messages, newMessage]);
            }
        });

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
            socket?.off("newMessage");
            socket?.off("typing");
            socket?.off("stopTyping");
        };
    }, [socket, setMessages, messages, selectedConversation, setTypingStatus]);
};

export default useListenMessages;
