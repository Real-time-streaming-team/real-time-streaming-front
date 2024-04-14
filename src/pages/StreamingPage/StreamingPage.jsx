import React from 'react'
import StreamViewer from '../../components/Streaming/StreamViewer'
import LiveChat from '../../components/Streaming/LiveChat'
import { useParams } from 'react-router-dom'

const StreamingPage = () => {

  const { roomId } = useParams();

  return (
    <div className='flex min-h-lvh'>

      <div className=' flex flex-col flex-1 min-w-[600px]'>
        {/* viewer */}
        <StreamViewer />

        {/* detail */}
        <div className='bg-gray-200 h-1/5 min-h-[100px]'>detail</div>
      </div>

      <div className='w-1/4 min-w-[300px]'>
        {/* chat */}
        <LiveChat roomId={roomId} />

      </div>


    </div>
  )
}

export default StreamingPage
