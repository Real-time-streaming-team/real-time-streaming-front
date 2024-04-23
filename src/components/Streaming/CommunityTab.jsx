import React from 'react';

function CommunityTab({ setCommunityActive }) {
  const users = ['Kai0808', 'eoen', 'talgo3'];

  return (
    <div className="flex h-screen flex-col border-l-[.1px] border-[#494949] bg-[#0D0A18] font-thin text-white">
      <div className="flex-1 overflow-auto text-[14px] font-medium">
        {/* Header */}
        <div className="flex items-center justify-between border-b-[.1px] border-[#494949] px-3 py-4">
          <h3 className="font-bold">Communtiy</h3>
          <button type="button" onClick={() => setCommunityActive(false)}>
            <img src="/icon-community-active.png" alt="iconActive" />
          </button>
        </div>

        {/* BroadCaster */}
        <div className="w-full border-b-[.1px] border-[#494949] p-4">
          <div className="mb-2 flex">
            <div className="mr-2">
              <img src="/icon-broadcast.png" alt="iconBroadcast" />
            </div>
            <div className="text-lg font-bold">BROADCASTER</div>
          </div>
          <div>Streamer_name93</div>
        </div>

        {/* Viewer */}
        <div className="w-full p-4 ">
          <div className="mb-2 flex">
            <div className="mr-2">
              <img src="/icon-user.png" alt="iconUser" />
            </div>
            <div className="text-lg font-bold">VIEWER</div>
          </div>
          <div>
            {/* 스트리머 방에 접속해있는 사람들 */}
            {users.map(item => {
              return (
                <div key={item} className="mb-1">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityTab;
