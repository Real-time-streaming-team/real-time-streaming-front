import { useState } from 'react';
import StreamViewer from '../../components/Streaming/StreamViewer';
// import LiveChat from '../../components/Streaming/LiveChat'
import LiveChatCopy from '../../components/Streaming/LiveChatCopy';
// import { useParams } from 'react-router-dom';
import CommunityTab from '../../components/Streaming/CommunityTab';
import StreamerProfile from '../../components/Streaming/StreamerProfile';

const StreamingPage = () => {
  const [communityActive, setCommunityActive] = useState(false);
  // const { roomId } = useParams();

  return (
    <div className="flex max-h-lvh">
      <div className="flex min-w-[600px] flex-1 flex-col">
        {/* viewer */}
        <StreamViewer />

        {/* detail */}
        <StreamerProfile />
      </div>

      <div className="w-1/4 min-w-[300px]">
        {/* chat */}
        {/* {communityActive ? <CommunityTab setCommunityActive={setCommunityActive}/>
          : <LiveChat roomId={roomId} setCommunityActive={setCommunityActive}/>} */}

        {communityActive ? (
          <CommunityTab setCommunityActive={setCommunityActive} /> // 스트리머에 대한 정보
        ) : (
          <LiveChatCopy setCommunityActive={setCommunityActive} />
        )}
      </div>
    </div>
  );
};

export default StreamingPage;
