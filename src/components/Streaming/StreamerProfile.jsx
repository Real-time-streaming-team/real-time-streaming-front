import { useEffect, useState } from 'react';
import StreamerInfo from './StreamerInfo';
import StreamerButton from './StreamerButton';
import dummyData from './dummyData.json';

function StreamerProfile() {
  const [subscribed, setSubscribed] = useState(false);
  const [streamer, setStreamer] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log('get');

    // 유저 정보를 받아온다. get
    setUser(dummyData.user);
    // 스트리머 정보를 받아온다. get
    setStreamer(dummyData.streamer);

    // 유저의 스트리밍 구독을 확인한다.
    // if(user.subscribed === streamer.id) setSubscribed(true)
  }, []);

  useEffect(() => {
    if (user.length && streamer.length) {
      console.log(user.length, streamer);
      user.follows.map(follow => {
        if (follow.name === streamer.name) setSubscribed(true);
      });
    }
  }, [user, subscribed]);

  const followHandler = () => {
    // 서버에 subscribed post

    // 서버 response ok이면
    setSubscribed(prev => !prev);
  };

  return (
    <div className="h-1/5 min-h-[100px] flex justify-between items-center px-10 border-t-[.1px] border-[#494949]">
      {/* profile wrap */}
      <StreamerInfo streamer={streamer} />

      {/* follow button */}
      <StreamerButton followHandler={followHandler} subscribed={subscribed} />
    </div>
  );
}

export default StreamerProfile;
