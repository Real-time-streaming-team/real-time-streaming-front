import React from 'react'

function StreamerProfile() {
  return (
    <div className='h-1/5 min-h-[100px] flex justify-between items-center px-10 border-t-[.1px] border-[#494949]'>
      {/* profile wrap */}
      <div className='flex'>
        <div className='bg-bt-gradient mr-5 w-[80px] h-[80px] rounded-full'></div>
        <div className='flex flex-col justify-center'>
          <div className=' text-xl'>Streamer123123</div>
          <div>streamer detail content</div>
        </div>
      </div>

      {/* follow button */}
      <button className='flex bg-bt-gradient px-5 py-2 rounded-sm items-center text-base'>
        <div className='mr-1'>+</div>
        <div className=''>Follow</div>
      </button>

    </div>
  )
}

export default StreamerProfile
