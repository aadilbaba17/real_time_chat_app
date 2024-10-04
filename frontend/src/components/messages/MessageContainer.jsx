// MessageContainer.js
import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import Home from "../../pages/home/Home";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(selectedConversation._id);

	return (
		<div className="flex flex-col h-screen w-full overflow-hidden">
			{!selectedConversation ? (
				<Home />
			) : (
				<>
					{/* Header */}
					<div className="bg-green-400 px-4 py-2 flex items-center shadow-lg sticky top-0 z-10">
						<img
							src={selectedConversation.profilePic}
							alt="Avatar"
							className="w-10 h-10 rounded-full border-2 border-white"
						/>
						<div className="ml-3 flex flex-col">
							<span className="text-white font-bold">{selectedConversation.fullName}</span>
							{isOnline && <span className="text-white text-xs">Online</span>}
						</div>
					</div>
					<Messages />
					<div className="sticky bottom-0 w-full z-10">
						<MessageInput />
					</div>
				</>
			)}
		</div>
	);
};

export default MessageContainer;
