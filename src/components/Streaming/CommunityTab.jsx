import React from 'react'

const CommunityTab = ({ setCommunityActive }) => {
    return (
        <div className='flex flex-col h-screen border-l-[.1px] border-[#494949] bg-[#0D0A18] text-white font-thin'>
            <div className='flex-1 overflow-auto text-[14px]'>
            <div>
                CommunityTab
            </div>
            <div onClick={() => setCommunityActive(false)}>Chat</div>
            </div>
        </div>
    )
}

export default CommunityTab
