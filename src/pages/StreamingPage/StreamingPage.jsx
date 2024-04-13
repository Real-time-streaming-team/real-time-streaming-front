import React from 'react'
import StreamViewer from '../../components/Streaming/StreamViewer'
import LiveChat from '../../components/Streaming/LiveChat'
import { useParams } from 'react-router-dom'

const StreamingPage = () => {

  const { roomId } = useParams();

  return (
    <>
      <StreamViewer/>
      <LiveChat roomId={roomId} />
    </>
  )
}

export default StreamingPage
