// MessageInput.js
import { useState } from "react";
import { BsMic, BsSend } from "react-icons/bs";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const { socket } = useSocketContext();
    const { selectedConversation } = useConversation();
    let typingTimeout;

    const handleTyping = () => {
        if (socket && selectedConversation) {
            socket.emit("typing", { conversationId: selectedConversation._id });
            
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                socket.emit("stopTyping", { conversationId: selectedConversation._id });
            }, 2000); 
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
        handleTyping();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
        if (socket && selectedConversation) {
            socket.emit("stopTyping", { conversationId: selectedConversation._id });
        }
    };

    return (
        <form className="p-2" onSubmit={handleSubmit}>
            <div className="relative flex items-center rounded-full bg-gray-100 p-2">
                <input
                    type="text"
                    className="input input-bordered rounded-full flex-1 placeholder-gray-500"
                    placeholder="Type a message"
                    value={message}
                    onChange={handleChange}
                />
                <button type="submit" className="p-2 text-green-600">
                    {loading ? (
                        <div className="loading loading-spinner"></div>
                    ) : message ? (
                        <BsSend size={20} />
                    ) : (
                        <BsMic size={20} />
                    )}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
