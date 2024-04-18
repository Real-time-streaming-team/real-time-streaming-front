import React from 'react';

const CommunityTab = ({ setCommunityActive }) => {
    let users = ["Kai0808", "eoen", "talgo3"]

    return (
        <div className='flex flex-col h-screen border-l-[.1px] border-[#494949] bg-[#0D0A18] text-white font-thin'>
            <div className='flex-1 overflow-auto text-[14px] font-medium'>

                {/* Header */}
                <div className='flex justify-between items-center px-3 border-b-[.1px] border-[#494949] py-4'>
                    <h3 className='font-bold'>Communtiy</h3>
                    <div onClick={() => setCommunityActive(false)}><img src='/icon-community-active.png' /></div>
                </div>

                {/* BroadCaster */}
                <div className='border-b-[.1px] border-[#494949] w-full p-4'>
                    <div className='flex mb-2'>
                        <div className='mr-2'><img src='/icon-broadcast.png' /></div>
                        <div className='font-bold text-lg'>BROADCASTER</div>
                    </div>
                    <div>Streamer_name93</div>
                </div>

                {/* Viewer */}
                <div className=' w-full p-4'>
                    <div className='flex mb-2'>
                        <div className='mr-2'><img src='/icon-user.png' /></div>
                        <div className='font-bold text-lg'>VIEWER</div>
                    </div>
                    <div>
                        {/* 스트리머 방에 접속해있는 사람들 */}
                        {users.map((item, idx) => {
                        return (
                            <div key={idx} className='mb-1'>{item}</div>
                        )
                    })}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CommunityTab
