import axios from 'axios';
import { useEffect, useState } from 'react';
import dummyData from '../../components/vidio/dummyData.json';
import VidioItem from '../../components/vidio/VidioItem';

// 무한스크롤 구현예정
const Homepage = () => {
  const [streams, setStreams] = useState([]);
  useEffect(() => {
    (async () => {
      const { streamList } = await axios.get(`/api/stream/list?page=1`);
      setStreams([...dummyData]);
      console.log(streamList);
    })();
    return () => {
      setStreams([]);
    };
  }, []);
  return (
    <div className="flex">
      <div className="mt-6 grid size-full grid-cols-5 gap-4">
        {streams?.length !== 0 ? (
          streams.map(stream => (
            <VidioItem
              key={stream.streamId}
              title={stream.title}
              people={stream.people}
              streamId={stream.streamId}
              userId={stream.streamer.userId}
              nickname={stream.streamer.nickname}
            />
          ))
        ) : (
          <div className="flex w-full items-center justify-center">
            <h2 className="text-2xl">방송하는 스트리머가 없습니다.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
