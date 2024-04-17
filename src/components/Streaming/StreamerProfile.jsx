import React, { useEffect, useState } from 'react';
import StreamerInfo from './StreamerInfo';
import StreamerButton from './StreamerButton';

function StreamerProfile() {
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    // 유저 정보를 받아온다. user

    // 스트리머 정보를 받아온다. streamer

    // 유저의 스트리밍 구독을 확인한다.
    // if(user.subscribed === streamer.id) setSubscribed(true)

  }, []);

  const followHandler = () => {
    // 서버에 subscribed post

    // 서버 response ok이면
    setSubscribed(prev => !prev)
  }

  return (
    <div className='h-1/5 min-h-[100px] flex justify-between items-center px-10 border-t-[.1px] border-[#494949]'>
      {/* profile wrap */}
      <StreamerInfo />

      {/* follow button */}
      <StreamerButton followHandler={followHandler} subscribed={subscribed}/>
    </div>
  )
}

export default StreamerProfile
