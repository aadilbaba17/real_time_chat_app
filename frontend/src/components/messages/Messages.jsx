// Messages.js
import { useEffect, useRef, useState } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = ({handleSelectMessage}) => {

	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	// Scroll to the last message when messages change
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className="flex-1 overflow-y-auto p-4 ">
			{loading ? (
				[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
			) : messages?.length > 0 ? (
				messages?.map((message, index) => (
					<div
						key={message._id}
						ref={index === messages.length - 1 ? lastMessageRef : null}
					>
						<Message  onSelectMessage={handleSelectMessage}  message={message} />
					</div>
				))
			) : (
				<p className="text-center text-gray-500">Send a message to start the conversation</p>
			)}
		</div>
	);
};

export default Messages;
