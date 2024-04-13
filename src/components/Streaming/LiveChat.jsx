import React, { useEffect, useState } from 'react'
import socket from '../../api/socket'

const LiveChat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    console.log(message, messageList)
  }, [message, messageList]);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessageList(prev => [...prev, message]);
    setMessage('');
  };

  return (
    <div className='container mx-auto px-20'>
      <div className='w-[400px] h-[600px] mx-auto bg-gray-50 shadow-lg'>
        <div className='w-full h-[535px] flex flex-col p-4 overflow-auto'>

          {/* 말풍선 */}
          {/* <div className=' rounded-2xl px-4 py-[.4rem] mb-3 text-white bg-green-700 w-fit max-w-[50%]'>상대방</div> */}
          {/* <div className=' rounded-2xl px-4 py-[.4rem] mb-3 text-white bg-rose-400 w-fit max-w-[50%] ml-auto'>나</div> */}
          {/* <div className=' opacity-80 rounded-2xl px-4 py-[.4rem] mb-8 text-white bg-gray-400 w-5/6 m-auto text-center'>system님이 입장하셨습니다.</div> */}

          {messageList.map(message => {
            // 사용자에 따라 메세지 모양 변경...
            return (
              <div className='rounded-xl px-4 py-[.4rem] mb-3 text-white bg-green-700 w-fit max-w-[50%]'>{message}</div>
            )
          })}

        </div>

        {/* input field */}
        <div className='w-full h-[65px] bg-gray-100 flex items-center justify-center'>
          <form onSubmit={sendMessage} className='flex mx-4 w-full'>
            <input
              type='text'
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='px-4 py-[.3rem] w-full rounded-xl shadow-md flex-1'/>
            <button type='submit' className=' rounded-lg px-4 py-[.3rem] shadow-md bg-white ml-4'>전송</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LiveChat;
