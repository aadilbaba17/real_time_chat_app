// MessageInput.js
import { useState } from "react";
import { BsMic, BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { replyTo, setReplyTo } = useConversation(); // Access replyTo from Zustand
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;

        // Send the message along with reply context if there's a reply
        await sendMessage({
            text: message,
            replyTo: replyTo ? replyTo._id : null, // Include the ID of the message being replied to
        });

        setMessage("");
        setReplyTo(null); // Clear the reply context after sending
    };

    return (
        <form className="p-2" onSubmit={handleSubmit}>
            {/* Reply Context UI */}
            {replyTo && (
                <div className="bg-gray-200 p-2 mb-1 rounded flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                        <span className="font-bold">Replying to:</span> {replyTo.text}
                    </div>
                    <button
                        className="text-gray-500"
                        onClick={() => setReplyTo(null)} // Cancel the reply
                    >
                        Cancel
                    </button>
                </div>
            )}

            <div className="relative flex items-center rounded-full bg-gray-100 p-2">
                <input
                    type="text"
                    className="input input-bordered rounded-full flex-1 placeholder-gray-500"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
