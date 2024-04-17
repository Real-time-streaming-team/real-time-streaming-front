import React, { useEffect, useState } from 'react';
import StreamerInfo from './StreamerInfo';
import StreamerButton from './StreamerButton';

let streamerDummy = {
  "id": "1",
  "name": "streamerKing52",
  "title": "streamer detail content",
  "point": "1000",
};

let userDummy = {
  "id": "1",
  "name": "Kai0808",
  "follows": [
    {
      "id": "1",
      "name": "streamerKing52",
      "support": 20000,
    },
    {
      "id": "2",
      "name": "streamerDoi33",
      "support": 400,
    }
  ],
};

function StreamerProfile() {
  const [subscribed, setSubscribed] = useState(false);
  const [streamer, setStreamer] = useState({});
  const [user, setUser] = useState({});


  useEffect(() => {
    console.log('get');

    // 유저 정보를 받아온다. get
    setUser(userDummy);
    // 스트리머 정보를 받아온다. get
    setStreamer(streamerDummy);

    // 유저의 스트리밍 구독을 확인한다.
    // if(user.subscribed === streamer.id) setSubscribed(true)

  }, []);

  useEffect(() => {
    if (user.length && streamer.length) {
      console.log(user.length, streamer);
      user.follows.map(follow => {
        if (follow.name === streamer.name) setSubscribed(true);
      })
    };
  }, [user, subscribed])

  const followHandler = () => {
    // 서버에 subscribed post

    // 서버 response ok이면
    setSubscribed(prev => !prev)
  }

  return (
    <div className='h-1/5 min-h-[100px] flex justify-between items-center px-10 border-t-[.1px] border-[#494949]'>
      {/* profile wrap */}
      <StreamerInfo streamer={streamer} />

      {/* follow button */}
      <StreamerButton followHandler={followHandler} subscribed={subscribed} />
    </div>
  )
}

export default StreamerProfile
