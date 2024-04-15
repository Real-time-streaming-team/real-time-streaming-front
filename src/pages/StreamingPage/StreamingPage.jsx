import React from 'react'
import StreamViewer from '../../components/Streaming/StreamViewer'
import LiveChat from '../../components/Streaming/LiveChat'
import { useParams } from 'react-router-dom'
import StreamerProfile from '../../components/Streaming/StreamerProfile'

const StreamingPage = () => {

  const { roomId } = useParams();

  return (
    <div className='flex min-h-lvh'>

      <div className=' flex flex-col flex-1 min-w-[600px]'>
        {/* viewer */}
        <StreamViewer />

        {/* detail */}
        <StreamerProfile/>
      </div>

      <div className='w-1/4 min-w-[300px]'>
        {/* chat */}
        <LiveChat roomId={roomId} />

      </div>


    </div>
  )
}

export default StreamingPage
