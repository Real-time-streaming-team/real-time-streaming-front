import React, { useEffect, useState } from 'react'
import socket from '../../api/socket'

const LiveChat = ({ roomId }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [join, setJoin] = useState(false);

  useEffect(() => {
    askUserName();

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
    <div className='container mx-auto px-20'>
      <div className='w-[400px] h-[600px] mx-auto bg-gray-50 shadow-lg'>

        <div className='bg-purple-200 py-2 w-full text-center text-white'>{roomId}Room</div>

        <div className='w-full h-[535px] flex flex-col p-4 overflow-auto'>

          {join ? <div className=' opacity-80 rounded-2xl px-4 py-[.4rem] mb-8 text-white bg-gray-400 w-5/6 m-auto text-center'>{user?.name}님이 입장하셨습니다.</div> : null}
          {messageList.map((message, idx) => {
            // 사용자에 따라 메세지 모양 변경
            const messageStyleClass = message.user.name === user?.name ? 'rounded-2xl px-4 py-[.4rem] mb-3 text-white bg-rose-400 w-fit max-w-[50%] ml-auto'
              : 'rounded-xl px-4 py-[.4rem] mb-3 text-white bg-green-700 w-fit max-w-[50%]';

            return (
                <div className={messageStyleClass}><div>{message?.chat}</div></div>
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
              className='px-4 py-[.3rem] w-full rounded-xl shadow-md flex-1' />
            <button type='submit' className=' rounded-lg px-4 py-[.3rem] shadow-md bg-white ml-4'>전송</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LiveChat;
