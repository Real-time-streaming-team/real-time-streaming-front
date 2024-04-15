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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // 시간과 분을 항상 두 자리로 표시
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
  };

  const messageColor = () => {
    // if (message.user.name === 'master') 'text-[#FF4AF8]';
    if (false) return 'text-[#FF4AF8]';
    else return 'text-[#4ABEFF]'
  }

  const chatWarning = () => {
    let warningMessage;
    if (true) warningMessage = 'user warning(chat plastered)';
    else if (abusive) warningMessage = 'user warning(chat abusive language)';

    return (
      <div className='flex text-[#FF0000]'>
        <div className='min-w-[70px] text-center font-bold'>User1:</div>
        <div className='w-full m-auto'><div>{warningMessage}</div></div>
      </div>
    )
  }


  return (
    <div className='flex flex-col h-screen border-l-[.1px] border-[#494949] bg-[#0D0A18] text-white font-thin'>
      <div className='flex-1 overflow-auto text-[14px]'>

        {/* Room name */}
        <div className='flex justify-between items-center px-3 border-b-[.1px] border-[#494949] py-4'>
          <h3>🔴 LIVE Chat</h3>
          <div><img src='/icon-community.png' /></div>
        </div>

        {/* Chat window */}
        <div className='w-full p-4'>

          {/* Join message */}
          {join && <div className='opacity-80 text-sm font-thin rounded-2xl px-4 py-[.4rem] mb-8 text-center bg-[#33385766] w-5/6 m-auto'>{user?.name}님이 입장하셨습니다.</div>}

          <div className='flex w-full break-words mb-2 font-thin'>
            <div>00:00</div>
            {false ? chatWarning()
              : <div className='flex'>
                <div className={`min-w-[70px] text-center ${messageColor()} font-bold`}>User1:</div>
                <div className='w-full m-auto'><div>Hello world!Hello world!Hello world!Hello world!Hello world!</div></div>
              </div>}
          </div>

          {/* chat message */}
          {messageList.map((message, idx) => (
            <div key={idx} className='flex w-full break-words mb-2 font-thin'>
              <div>{formatTime(message.createdAt)}</div>
              <div className='flex'>
                <div className={`min-w-[70px] text-center ${messageColor()} mr-1 font-bold`}>{message.user?.name}:</div>
                <div className='w-full m-auto'><div>{message.chat}</div></div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* chat field */}
      <div className='w-full h-[110px] border-t-[.1px] border-[#494949] flex flex-col items-center justify-center px-4'>

        <form onSubmit={sendMessage} className='w-full'>
          <div className='relative'>

            {/* message input */}
            <input
              type='text'
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder='Send Message'
              className='px-4 py-[.5rem] w-full rounded-lg shadow-md bg-transparent border-[#494949] border-[.1px]' />

            {/* send button */}
            <button type='submit' className=' font-extrabold underline text-[#4ABEFF] absolute top-1 right-0 rounded-lg px-4 py-[.3rem] shadow-md ml-2'>SEND</button>

          </div>
        </form>

        {/* support field */}
        <div className='w-full flex justify-between items-center mt-3 font-bold'>

          {/* amount */}
          <div className='flex'>
            <div className='mr-1'>
              <img src='/icon-spon.png' />
            </div>
            <div>100,000</div>
          </div>

          {/* spon button */}
          <div>
            <button className=' bg-bt-gradient px-2 py-1 rounded-md text-sm '>SPON</button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default LiveChat;
