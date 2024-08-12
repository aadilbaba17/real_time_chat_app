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
		<div className="flex flex-col h-screen w-full  overflow-hidden ">
			{!selectedConversation ? (
				<Home />
			) : (
				<>
					{/* Header */}
					<div className="bg-yellow-400 px-2 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 py-2 mb-2 mt-4 w-full sticky top-0 z-10 flex items-center shadow">
  <div className="mr-3">
    <img
      src={selectedConversation.profilePic} 
      alt="Avatar"
      className="w-10 h-10 rounded-full border-2 border-black"
    />
  </div>
  <div className="flex flex-col">

    <span className="text-white font-bold text-base">{selectedConversation.fullName}</span>
  </div>
</div>

					
					
						<Messages />
					

					
					<div className="sticky bottom-0  w-full z-10">
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
