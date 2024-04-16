import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const LiveChat = ({ streamId, setCommunityActive }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [join, setJoin] = useState(false);

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);

  
  useEffect(() => {
    // SockJS와 Stomp를 사용하여 웹소켓 클라이언트를 생성합니다.
    const sockJs = new SockJS('http://158.247.240.142:8080/chat');
    const stompClient = new Client({
      webSocketFactory: () => sockJs,
      // 연결이 성공했을 때 실행될 콜백
      onConnect: () => {
        console.log('Connected');
  
        // 서버로부터 메시지를 받도록 구독합니다.
        stompClient.subscribe(`/stream/${streamId}`, (message) => {
          // 보낸 메시지를 messages 상태에 추가합니다.
          console.log(message);
          setMessages(prev => [...prev, JSON.parse(message.body)]);
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);
    console.log('stomp client: ', stompClient)

    return () => {
      // 컴포넌트가 언마운트 될 때 연결을 끊습니다.
      stompClient.deactivate();
    };
  }, []);

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

  // 메시지를 보내는 함수

  const sendMessage = (e) => {
    const destination = `/sendChat/${streamId}`;
    e.preventDefault();

    client.send(destination, {}, JSON.stringify({
      content: message
    }));
    // token추가
    setMessage('');
  }

  // function sendMessage(messageContent) {
  //   // STOMP를 통해 서버에 메시지를 보낼 목적지 주소
  //   const destination = "/app/sendMessage";

  //   // STOMP 클라이언트의 send 함수를 사용하여 메시지 전송
  //   // 첫 번째 인자는 목적지 주소
  //   // 두 번째 인자는 선택적 헤더, 필요한 경우 추가할 수 있음
  //   // 세 번째 인자는 문자열로 변환된 JSON 메시지 본문
  //   stompClient.send(destination, {}, JSON.stringify({
  //     content: messageContent
  //   }));
  // }


  return (
    <div className='flex flex-col h-screen border-l-[.1px] border-[#494949] bg-[#0D0A18] text-white font-thin'>
      <div className='flex-1 overflow-auto text-[14px]'>

        {/* Header */}
        <div className='flex justify-between items-center px-3 border-b-[.1px] border-[#494949] py-4'>
          <h3 className='font-bold'>🔴 LIVE Chat</h3>
          <div onClick={() => setCommunityActive(true)}><img src='/icon-community.png' /></div>
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
          {messages.map((message, idx) => (
            <div key={idx} className='flex w-full break-words mb-2 font-thin'>
              {/* <div>{formatTime(message.createdAt)}</div> */}
              <div className='flex'>
                {/* <div className={`min-w-[70px] text-center ${messageColor()} mr-1 font-bold`}>{message.user?.name}:</div> */}
                <div className='w-full m-auto'><div>{message.content}</div></div>
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
