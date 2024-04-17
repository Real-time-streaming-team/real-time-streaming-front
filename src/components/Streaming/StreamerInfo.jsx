import React from 'react'

const StreamerInfo = ({ streamer }) => {
    return (
        <div className='flex'>
            <div className='bg-blue-700 mr-5 w-[80px] h-[80px] rounded-full'></div>
            <div className='flex flex-col justify-center'>
                <div className=' text-xl'>{streamer.name}</div>
                <div>{streamer.title}</div>
            </div>
        </div>
    )
}

export default StreamerInfo
