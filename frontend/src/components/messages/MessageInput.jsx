import { useState } from "react";
import { BsSend } from "react-icons/bs";
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
		<form className="px-4 my-3" onSubmit={handleSubmit}>
  <div className="w-full relative">
    <input
      type="text"
      className="border-none rounded-full block w-full p-3 pr-12 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      placeholder="Send a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-4 text-yellow-500 hover:text-yellow-400">
      {loading ? <div className="loading loading-spinner"></div> : <BsSend size={20} />}
    </button>
  </div>
</form>

	);
};
export default MessageInput;