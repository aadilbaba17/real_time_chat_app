import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 mt-5 h-full w-full flex flex-col  overflow-hidden'>

<SearchInput/>
        <div className='divider px-3'></div>

        <Conversations/>
        <LogoutButton/>
        <p className='text-center text-sm mt-4 align-center justify-center text-gray-700 font-semibold'>Developed by Aadil baba</p>
    </div>
  )
}

export default Sidebar