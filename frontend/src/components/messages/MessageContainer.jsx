import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import Home from "../../pages/home/Home";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	// Uncomment this if you need to clean up when unmounting
	// useEffect(() => {
	// 	return () => setSelectedConversation(null);
	// }, [setSelectedConversation]);

	return (
		<div className="flex flex-col h-full w-full">
			{!selectedConversation ? (
				<Home />
			) : (
				<>
					{/* Header */}
					<div className="bg-slate-500 px-4 py-2 mb-2 mt-5 w-full sticky top-0 z-10">
						<span className="label-text">To:</span>{" "}
						<span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
					</div>

					{/* Messages - scrollable area */}
					<div className="flex-grow overflow-y-auto">
						<Messages />
					</div>

					{/* Message Input - fixed at the bottom */}
					<div className="sticky bottom-0 bg-white w-full z-10">
						<MessageInput />
					</div>
				</>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl md:text-6xl text-center" />
			</div>
		</div>
	);
};
