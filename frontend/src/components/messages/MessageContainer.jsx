// MessageContainer.js
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useSocketContext } from "../../context/SocketContext";
import Home from "../../pages/home/Home";

const MessageContainer = () => {
    const { selectedConversation, typingStatus,setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);
    const navigate = useNavigate();

    const handleBack = () => {
        setSelectedConversation(null);
        navigate('/');
    };

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-100">
            {!selectedConversation ? (
                <Home />
            ) : (
                <>
                    <div className="bg-green-400 px-4 py-2 flex items-center shadow-lg sticky top-0 z-10">
                        <IoArrowBack 
                            className="text-white cursor-pointer" 
                            size={24} 
                            onClick={handleBack}
                        />
                        <img
                            src={selectedConversation.profilePic}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border-2 border-white ml-2"
                        />
                        <div className="ml-3 flex flex-col">
                            <span className="text-white font-bold">{selectedConversation.fullName}</span>
                            {isOnline && <span className="text-white text-xs">Online</span>}
                            {typingStatus && <span className="text-white text-xs italic">Typing...</span>}
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
