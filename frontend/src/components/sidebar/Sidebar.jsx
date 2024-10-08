import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import { useAuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='bg-white border-r border-gray-200 p-4 h-full w-full flex flex-col overflow-hidden'>
      <div className="flex items-center mb-4 justify-between">
      <p className="text-gray-800 font-semibold truncate">{authUser.fullName}</p>
        <h2 className="text-2xl font-bold text-gray-800">Chats</h2>
        <LogoutButton />
      </div>

      <SearchInput />
      <div className='divider my-2' />

      <Conversations />
      <p className='text-center text-xs mt-2 mb-2 text-gray-500'>Developed by Aadil Baba</p>
    </div>
  );
};

export default Sidebar;
