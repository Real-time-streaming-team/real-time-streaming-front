import React from 'react';
import { useNavigate } from 'react-router-dom';

const VidioItem = ({ title, people, streamId, userId, nickname }) => {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      className="flex cursor-pointer flex-col hover:bg-slate-700"
      onClick={() => navigate(`/streaming?streamId=${streamId}`)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/streaming?streamId=${streamId}`);
        }
      }}
      tabIndex={0}
    >
      <img src="/streamImg.png" alt="썸네일" className="h-[195px] w-full" />
      <div className="flex flex-col px-2 py-1">
        <span className=" line-clamp-2 text-start text-white">{title}</span>
        <div className="flex items-center justify-start">
          <p className="text-slate-300">{nickname}</p>
          <li className="ml-3 h-5 w-10 list-none rounded-md bg-red-600 text-center text-sm text-white">
            <b>Live</b>
          </li>
        </div>
      </div>
      <div className="flex items-center px-2 py-1 text-sm text-white">
        <img src="/icon-user.png" alt="iconUser" className="size-5" />
        <b className="ml-1">{people}</b>
      </div>
    </div>
  );
};

export default VidioItem;
