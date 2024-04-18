import React, { useState } from 'react'
import StreamViewer from '../../components/Streaming/StreamViewer'
// import LiveChat from '../../components/Streaming/LiveChat'
import LiveChatCopy from '../../components/Streaming/LiveChatCopy'
import { useParams } from 'react-router-dom'
import StreamerProfile from '../../components/Streaming/StreamerProfile'
import CommunityTab from '../../components/Streaming/CommunityTab'

const StreamingPage = () => {
  const [communityActive, setCommunityActive] = useState(false);
  // const { roomId } = useParams();

  return (
    <div className='flex max-h-lvh'>

      <div className=' flex flex-col flex-1 min-w-[600px]'>
        {/* viewer */}
        <StreamViewer />

        {/* detail */}
        <StreamerProfile />
      </div>

      <div className='w-1/4 min-w-[300px]'>
        {/* chat */}
        {/* {communityActive ? <CommunityTab setCommunityActive={setCommunityActive}/>
          : <LiveChat roomId={roomId} setCommunityActive={setCommunityActive}/>} */}

        {communityActive ? <CommunityTab setCommunityActive={setCommunityActive} />
          : <LiveChatCopy setCommunityActive={setCommunityActive} />}



      </div>


    </div>
  )
}

export default StreamingPage
