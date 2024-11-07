import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message, handleReply }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation, replyTo } = useConversation(); // Get the reply context from Zustand store
	const fromMe = message.senderId === authUser._id;
	const bubbleColor = fromMe ? "bg-green-400" : "bg-gray-200";
	const textColor = fromMe ? "text-white" : "text-black";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

	// When a message is clicked, trigger the handleReply function to set it as the reply context
	const handleClick = () => {
		handleReply(message); // Set this message as the reply context
	};

	return (
		<div className={`flex ${fromMe ? "justify-end" : "justify-start"} mb-2`}>
			{/* Display the profile pic only if the message is not from the current user */}
			{!fromMe && (
				<img className="w-8 h-8 rounded-full mr-2" src={profilePic} alt="Profile Pic" />
			)}

			{/* The message bubble */}
			<div
				className={`p-2 rounded-lg max-w-xs ${bubbleColor} ${textColor}`}
				onClick={handleClick} // When message is clicked, set it as the reply target
			>
				{/* If this message is a reply to another message, display the original message being replied to */}
				{message.replyTo && (
					<div className="text-sm text-gray-500 border-l-2 pl-2 mb-1">
						Replying to: {message.replyTo.message}
					</div>
				)}
				{/* Message Text */}
				<div>{message.message}</div>
				{/* Message Timestamp */}
				<div className="text-xs text-right mt-1">{extractTime(message.createdAt)}</div>
			</div>
		</div>
	);
};

export default Message;
