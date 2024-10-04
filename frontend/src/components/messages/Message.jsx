// Message.js
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const bubbleColor = fromMe ? "bg-green-400" : "bg-gray-200";
	const textColor = fromMe ? "text-white" : "text-black";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

	return (
		<div className={`flex ${fromMe ? "justify-end" : "justify-start"} mb-2`}>
			{!fromMe && (
				<img
					className="w-8 h-8 rounded-full mr-2"
					src={profilePic}
					alt="Profile Pic"
				/>
			)}
			<div className={`p-2 rounded-lg max-w-xs ${bubbleColor} ${textColor}`}>
				<div>{message.message}</div>
				<div className="text-xs text-right mt-1">{extractTime(message.createdAt)}</div>
			</div>
		</div>
	);
};

export default Message;
