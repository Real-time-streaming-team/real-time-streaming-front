// 직접적으로 socketio 연결을 할 필요x /stream/sendChat/{streamId} 로 post 요청을 보내 백엔드 에서 소켓 연결 시도
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import BanActive from '../modal/BanActive';
import dummyData from './dummyData.json';

const LiveChat = ({ setCommunityActive }) => {
  const [user, setUser] = useState({});
  const [streamer, setStreamer] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [join, setJoin] = useState(false);
  const [client, setClient] = useState(null);
  const [banActive, setBanActive] = useState(false);

  useEffect(() => {
    // user, streamer 정보 받아오기
    setUser(dummyData.user);
    setStreamer(dummyData.streamer);
    setJoin(true);

    // SockJS와 Stomp를 사용하여 웹소켓 클라이언트를 생성합니다.
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(`/api/chat`),
      debug(str) {
        console.log(str);
      },
      // 연결이 성공했을 때 실행될 콜백
      onConnect: () => {
        console.log('sockJs 연결 성공!');

        // 서버로부터 메시지를 받도록 구독합니다.
        stompClient.subscribe(`/stream/${streamer.id}`, message => {
          // 보낸 메시지를 messages 상태에 추가합니다.
          setMessages(prev => [...prev, JSON.parse(message.body)]); // {id:id, content:content}
        });
        stompClient.publish({
          destination: 'body',
          body: JSON.stringify({
            userId: user,
            content: message,
          }),
        });
      },
      onStompError: err => {
        console.log('Stomp error: ', err);
      },
    });

    // 클라이언트 활성화
    stompClient.activate();
    setClient(stompClient);

    console.log('stomp client: ', stompClient);

    return () => {
      // 컴포넌트가 언마운트 될 때 연결을 끊습니다.
      stompClient.deactivate();
    };
  }, []);

  // 메시지를 보내는 함수
  const sendMessage = async e => {
    try {
      e.preventDefault();
      if (!client) {
        console.error('STOMP 연결이 설정되지 않았습니다.');
        return;
      }
      const destination = `/sendMessage/${streamer.id}`;
      console.log(client.publish);
      client.publish({
        destination,
        body: JSON.stringify({
          userId: user,
          content: message,
        }),
      });
      console.log('send 성공');
      // + token추가
      setMessage('');
    } catch (err) {
      console.log('send 실패: ', err);
    }
  };

  const formatTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // 시간과 분을 항상 두 자리로 표시
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  const messageColor = () => {
    if (message.id === streamer.id) return 'text-[#FF4AF8]'; // streamer
    if (message.id === user.id) return 'text-[#4ABEFF]'; // user
  };

  const chatWarning = () => {
    let warningMessage;

    if (true) warningMessage = 'user warning(chat plastered)';
    else if (abusive) warningMessage = 'user warning(chat abusive language)';

    return (
      <div className="flex text-[#FF0000]">
        <div className="min-w-[70px] text-center font-bold">{user.name}:</div>
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
          <button type="button" onClick={() => setCommunityActive(true)}>
            <img src="/icon-community.png" alt="iconCommunity" />
          </button>
        </div>

        {/* Chat window */}
        <div className="w-full p-4">
          {/* Join message */}
          {join && (
            <div className="m-auto mb-8 w-5/6 rounded-2xl bg-[#33385766] px-4 py-[.4rem] text-center text-sm font-thin opacity-80">
              {user?.name}님이 입장하셨습니다.
            </div>
          )}

          <div className="relative">
            {banActive && <BanActive setBanActive={setBanActive} />}
            <div className="mb-2 flex w-full break-words font-thin">
              <div>{formatTime()}</div>
              {false ? (
                chatWarning()
              ) : (
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setBanActive(true)}
                    className={`min-w-[70px] text-center ${messageColor()} font-bold`}
                  >
                    {user.name}:
                  </button>
                  <div className="m-auto w-full">
                    <div>
                      Hello world!Hello world!Hello world!Hello world!Hello
                      world!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            {/* BanActive modal */}
            {/* <BanActive /> */}
            {/* chat message */}
            {messages.map((message, idx) => (
              <div key={idx} className="mb-2 flex w-full break-words font-thin">
                <div>{formatTime()}</div>
                <div className="flex">
                  <div
                    className={`min-w-[70px] text-center ${messageColor()} mr-1 font-bold`}
                  >
                    {user.name}:
                  </div>
                  <div className="m-auto w-full">
                    <div>{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              <img src="/icon-spon.png" alt="sponIcon" />
            </div>
            <div>100,000</div>
          </div>

          {/* spon button */}
          <div>
            <button
              type="button"
              className="rounded-md bg-blue-800 px-2 py-1 text-sm "
            >
              SPON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
