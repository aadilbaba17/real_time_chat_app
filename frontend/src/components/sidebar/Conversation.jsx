import { Navigate, useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const navigate = useNavigate();
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center p-3 rounded-md cursor-pointer transition-all duration-200
					${isSelected ? "bg-green-100" : "hover:bg-gray-100"}`}
				onClick={() => {
					setSelectedConversation(conversation);
					navigate('/convo');
				}}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full overflow-hidden'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex justify-between items-center'>
						<p className='font-bold text-gray-800 truncate'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
					<p className='text-sm text-gray-600 truncate'>{conversation.lastMessage}</p>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;
