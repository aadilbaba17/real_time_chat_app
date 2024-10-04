// MessageInput.js
import { useState } from "react";
import { BsMic, BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className="p-2" onSubmit={handleSubmit}>
			<div className="relative flex items-center rounded-full bg-gray-100 p-2">
				<input
					type="text"
					className="flex-1 p-2 bg-transparent outline-none text-black placeholder-gray-500"
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
