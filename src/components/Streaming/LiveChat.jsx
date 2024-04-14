import React, { useEffect, useState } from 'react'
import socket from '../../api/socket'

const LiveChat = ({ roomId }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [join, setJoin] = useState(false);

  useEffect(() => {
    // askUserName();

    // room에 구독시킴
    socket.emit("joinRoom", roomId);

    // io에서 뿌린 메세지를 받음
    socket.on('message', (message) => {
      setMessageList((prev) => [...prev, message]);
    });

    return () => {
      socket.emit("leaveRoom", roomId); // 사용자가 방에서 나감을 서버에 알림
      socket.off("message"); // 이벤트를 해제함. 리소스 정리
    };
  }, []);

  const askUserName = () => {
    const userName = prompt("채팅방에서 사용할 이름을 입력하세요.");
    setJoin(true);
    socket.emit("login", userName, (res) => {
      if (res?.ok) setUser(res.data);
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // setMessageList(prev => [...prev, message]);
    socket.emit('sendMessage', roomId, message, (res) => {
      // 서버에서 io에 연결해 모든 client에게 message를 전송

    })
    setMessage('');
  };

  // message 데이터
  // {
  //     "chat": "메세지",
  //     "user": {
  //         "id": "661a787cb18dd29126f4c1bf",
  //         "name": "유저1"
  //     },
  //     "_id": "661a7ea521233762d87290a6",
  //     "createdAt": "2024-04-13T12:46:29.978Z",
  //     "updatedAt": "2024-04-13T12:46:29.978Z",
  //     "__v": 0
  // }

  return (
    <div className='flex flex-col h-screen bg-[#0D0A18] text-white font-thin'>
      <div className='flex-1 overflow-auto'>

        {/* Room name */}
        <div className='flex justify-between px-3 border-b-[.1px] border-[#ada1d866] py-2'>
          <h3>🔴 LIVE Chat</h3>
          <div>{roomId}</div>
        </div>

        {/* Chat window */}
        <div className='w-full p-4'>

          {/* Join message */}
          {join && <div className='opacity-80 text-sm font-thin rounded-2xl px-4 py-[.4rem] mb-8 text-center bg-[#33385766] w-5/6 m-auto'>{user?.name}님이 입장하셨습니다.</div>}

          {/* Bubbles */}
          {messageList.map((message, idx) => (
            <div key={idx} className='flex w-full break-words mb-3 font-thin'>
              <div className='min-w-[70px] text-center text-[#4ABEFF] mr-3'>{message.user?.name}</div>
              <div className='w-2/3 m-auto'><div>{message.chat}</div></div>
            </div>
          ))}

        </div>
      </div>

      {/* Input field */}
      <div className='w-full h-[65px] border-t-[.1px] border-[#ada1d866] flex items-center justify-center px-4'>
        <form onSubmit={sendMessage} className='w-full flex'>
          <input
            type='text'
            value={message}
            onChange={e => setMessage(e.target.value)}
            className='px-4 py-[.3rem] w-full rounded-xl shadow-md flex-1 bg-transparent border-[#ada1d866] border-2' />
          <button type='submit' className='rounded-lg bg-[#ada1d866] px-4 py-[.3rem] shadow-md ml-2'>전송</button>
        </form>
      </div>

    </div>
  )
}

export default LiveChat;
