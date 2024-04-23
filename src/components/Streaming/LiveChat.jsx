import { useEffect, useState } from 'react';
import socket from '../../api/socket';

const LiveChat = ({ roomId, setCommunityActive }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [join, setJoin] = useState(false);

  useEffect(() => {
    askUserName();

    // room에 구독시킴
    socket.emit('joinRoom', roomId);

    // io에서 뿌린 메세지를 받음
    socket.on('message', message => {
      setMessageList(prev => [...prev, message]);
    });

    return () => {
      socket.emit('leaveRoom', roomId); // 사용자가 방에서 나감을 서버에 알림
      socket.off('message'); // 이벤트를 해제함. 리소스 정리
    };
  }, []);

  const askUserName = () => {
    const userName = prompt('채팅방에서 사용할 이름을 입력하세요.');
    setJoin(true);
    socket.emit('login', userName, res => {
      if (res?.ok) setUser(res.data);
    });
  };

  const sendMessage = e => {
    e.preventDefault();
    // setMessageList(prev => [...prev, message]);
    socket.emit('sendMessage', roomId, message, res => {
      // 서버에서 io에 연결해 모든 client에게 message를 전송
    });
    setMessage('');
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // 시간과 분을 항상 두 자리로 표시
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  const messageColor = () => {
    // if (message.user.name === 'master') 'text-[#FF4AF8]';
    if (false) return 'text-[#FF4AF8]';
    return 'text-[#4ABEFF]';
  };

  const chatWarning = () => {
    let warningMessage;
    if (true) warningMessage = 'user warning(chat plastered)';
    else if (abusive) warningMessage = 'user warning(chat abusive language)';

    return (
      <div className="flex text-[#FF0000]">
        <div className="min-w-[70px] text-center font-bold">User1:</div>
        <div className="m-auto w-full">
          <div>{warningMessage}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col border-l-[.1px] border-[#494949] bg-[#0D0A18] font-thin text-white">
      <div className="flex-1 overflow-auto text-[14px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-[.1px] border-[#494949] px-3 py-4">
          <h3 className="font-bold">🔴 LIVE Chat</h3>
          <div onClick={() => setCommunityActive(true)}>
            <img src="/icon-community.png" />
          </div>
        </div>

        {/* Chat window */}
        <div className="w-full p-4">
          {/* Join message */}
          {join && (
            <div className="m-auto mb-8 w-5/6 rounded-2xl bg-[#33385766] px-4 py-[.4rem] text-center text-sm font-thin opacity-80">
              {user?.name}님이 입장하셨습니다.
            </div>
          )}

          <div className="mb-2 flex w-full break-words font-thin">
            <div>00:00</div>
            {false ? (
              chatWarning()
            ) : (
              <div className="flex">
                <div
                  className={`min-w-[70px] text-center ${messageColor()} font-bold`}
                >
                  User1:
                </div>
                <div className="m-auto w-full">
                  <div>
                    Hello world!Hello world!Hello world!Hello world!Hello world!
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* chat message */}
          {messageList.map((message, idx) => (
            <div key={idx} className="mb-2 flex w-full break-words font-thin">
              <div>{formatTime(message.createdAt)}</div>
              <div className="flex">
                <div
                  className={`min-w-[70px] text-center ${messageColor()} mr-1 font-bold`}
                >
                  {message.user?.name}:
                </div>
                <div className="m-auto w-full">
                  <div>{message.chat}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* chat field */}
      <div className="flex h-[110px] w-full flex-col items-center justify-center border-t-[.1px] border-[#494949] px-4">
        <form onSubmit={sendMessage} className="w-full">
          <div className="relative">
            {/* message input */}
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Send Message"
              className="w-full rounded-lg border-[.1px] border-[#494949] bg-transparent px-4 py-[.5rem] shadow-md"
            />

            {/* send button */}
            <button
              type="submit"
              className=" absolute right-0 top-1 ml-2 rounded-lg px-4 py-[.3rem] font-extrabold text-[#4ABEFF] underline shadow-md"
            >
              SEND
            </button>
          </div>
        </form>

        {/* support field */}
        <div className="mt-3 flex w-full items-center justify-between font-bold">
          {/* amount */}
          <div className="flex">
            <div className="mr-1">
              <img src="/icon-spon.png" />
            </div>
            <div>100,000</div>
          </div>

          {/* spon button */}
          <div>
            <button className=" bg-bt-gradient rounded-md px-2 py-1 text-sm ">
              SPON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
