// MessageContainer.js
import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import Home from "../../pages/home/Home";
import { useSocketContext } from "../../context/SocketContext";
import { IoArrowBack } from "react-icons/io5"; // Import back icon
import { useNavigate } from "react-router-dom"; // Import navigate for navigation

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const [selectedMessage, setSelectedMessage] = useState(null);
	const [inputText, setInputText] = useState(""); 
	const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);
	const navigate = useNavigate(); 
	// Initialize navigate
	const handleSelectMessage = (message) => {
		setSelectedMessage(message);
		console.log(message);
		setInputText(message.message); // Set the input text to the selected message
	  };
	const handleBack = () => {
		// Reset the selected conversation
		setSelectedConversation(null);
		// Navigate back to the previous screen or home
		navigate('/'); // Change '/home' to your desired route
	};

	return (
		<div className="flex flex-col h-screen w-full overflow-hidden bg-gray-100">
			{!selectedConversation ? (
				<Home />
			) : (
				<>
					{/* Header */}
					<div className="bg-orange-600 mx-2 mt-1 rounded-2xl px-4 py-2 flex items-center shadow-lg sticky top-0 z-10">
						{/* Back Icon */}
						<IoArrowBack 
							className="text-white cursor-pointer" 
							size={24} 
							onClick={handleBack} // Handle back button click
						/>
						<img
							src={selectedConversation.profilePic}
							alt="Avatar"
							className="w-10 h-10 rounded-full border-2 border-white ml-2"
						/>
						<div className="ml-3 flex flex-col">
							<span className="text-white font-bold">{selectedConversation.fullName}</span>
							{isOnline && <span className="text-white text-xs">Online</span>}
						</div>
					</div>
					<Messages handleSelectMessage={handleSelectMessage}/>
					<div className="sticky bottom-0 w-full z-10">
						<MessageInput selectedMessage={selectedMessage}  setSelectedMessage={setSelectedMessage}
						receiverId={selectedConversation._id} name={selectedConversation.fullName}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default MessageContainer;
