import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();
	const { authUser } = useAuthContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("No such user found!");
		}
	};

	return (
		<div className="flex items-center mb-4">
			<div className="flex items-center mr-2">
				<img className="w-10 h-10 rounded-full border-2 border-black" src={authUser.profilePic} alt="profile" />
				
			</div>

			<form onSubmit={handleSubmit} className='flex flex-1 items-center gap-2'>
				<input
					type='text'
					placeholder='Search…'
					className='input input-bordered rounded-full flex-1'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type='submit' className='btn btn-circle bg-green-500 text-white'>
					<IoSearchSharp className='w-6 h-6 outline-none' />
				</button>
			</form>
		</div>
	);
};

export default SearchInput;
