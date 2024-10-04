import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='flex flex-col overflow-auto'>
			{loading ? (
				<div className='flex justify-center py-4'>
					<span className='loading loading-spinner'></span>
				</div>
			) : (
				conversations.map((conversation, idx) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emoji={getRandomEmoji()}
						lastIdx={idx === conversations.length - 1}
					/>
				))
			)}
		</div>
	);
};

export default Conversations;
