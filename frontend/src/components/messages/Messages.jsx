import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation"; // Import useConversation for reply functionality

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const { replyTo, setReplyTo } = useConversation(); // Get the reply context from Zustand store
	const lastMessageRef = useRef();

	// Scroll to the last message when messages change
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	// Handle click on a message to reply
	const handleReply = (message) => {
		setReplyTo(message); // Set the message as the reply context
	};

	return (
		<div className="flex-1 overflow-y-auto p-4">
			{loading ? (
				[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
			) : messages.length > 0 ? (
				messages.map((message, index) => (
					<div
						key={message._id}
						ref={index === messages.length - 1 ? lastMessageRef : null}
					>
						{/* Pass the handleReply function to allow selecting a message to reply to */}
						<Message message={message} handleReply={handleReply} />
					</div>
				))
			) : (
				<p className="text-center text-gray-500">Send a message to start the conversation</p>
			)}

			{/* Show the "Replying to" context above the input field if a message is selected for reply */}
			{replyTo && (
				<div className="bg-gray-200 p-2 mb-2 rounded">
					<p className="text-sm text-gray-500">Replying to:</p>
					<div className="text-sm text-gray-700">{replyTo.message}</div>
					{/* Option to cancel the reply */}
					<button
						className="text-red-500 text-xs"
						onClick={() => setReplyTo(null)} // Cancel the reply context
					>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
};

export default Messages;
