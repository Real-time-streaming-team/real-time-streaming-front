import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchItem from '../../components/Search/SearchItem';
import dummyData from '../../components/vidio/dummyData.json';

const SearchListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('keyword');
  const page = queryParams.get('page') || 1;
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/api/stream/search?keyword=${searchTerm}&page=${page}`,
      );

      setSearchResults([...dummyData]);
    })();
    return () => {
      setSearchResults([]);
    };
  }, [searchTerm, page]);
  return (
    <div>
      <p>
        <b className="text-cyan-500">abc</b> Search Result
      </p>
      <ul>
        {/* {searchResults.length === 0 ? ( */}
        {searchResults.map(stream => (
          <SearchItem
            key={stream.streamId}
            title={stream.title}
            people={stream.people}
            streamerId={stream.streamerId}
            userId={stream.streamer.userId}
            nickname={stream.streamer.nickname}
          />
        ))}
        {/* ) : (
          <div className="flex items-center justify-center">
            <div>검색 결과 없음</div>
          </div>
        )} */}
      </ul>
    </div>
  );
};

export default SearchListPage;
