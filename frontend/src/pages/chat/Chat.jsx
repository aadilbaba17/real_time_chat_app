import React from 'react'
import MessageContainer from '../../components/messages/MessageContainer'

const Chat = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <MessageContainer/>
        </div>
  )
}

export default Chat