import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchItem = ({ title, people, streamId, userId, nickname }) => {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      className="mb-8 flex cursor-pointer hover:bg-slate-700"
      onClick={() => navigate(`/streaming?streamId=${streamId}`)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/streaming?streamId=${streamId}`);
        }
      }}
      tabIndex={0}
    >
      <img src="/streamImg.png" alt="썸네일" className="h-[195px] w-80" />
      <div className="ml-2 flex flex-col px-2 py-1">
        <span className="mb-1 line-clamp-2 text-start text-white">{title}</span>
        <div className="flex items-center justify-start">
          <li className="h-5 w-10 list-none rounded-md bg-red-600 text-center text-sm text-white">
            <b>Live</b>
          </li>
          <img src="/icon-user.png" alt="iconUser" className="size-5" />
          <b className="ml-1">{people}</b>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="size-8 rounded-full bg-gradient-to-b from-blue-300 to-blue-700" />
          <p className="text-slate-300">{nickname}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
