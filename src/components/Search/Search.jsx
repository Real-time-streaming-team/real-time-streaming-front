import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 무한스크롤 구현예정
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      navigate(
        `/searchlist?keyword=${encodeURIComponent(searchTerm)}&page=${page}`,
      );
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-between border-2 border-solid border-transparent bg-[#0D0A18] text-black [border-image:linear-gradient(to_right,#4ABEFF,#001AFF)_10]">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
        className="w-[500px] bg-transparent px-4 py-2 text-white outline-none hover:outline-gray-100"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="mx-3 cursor-pointer border-none bg-transparent p-0"
      >
        <img src="/searchIcon.png" alt="searchIcon" />
      </button>
    </div>
  );
};

export default Search;
