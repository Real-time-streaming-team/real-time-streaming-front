import React from 'react'

const BanActive = ({ setBanActive, user }) => {
    return (
        <div className='bg-[#0E0B19] absolute top-0 left-0 w-full min-h-[80px] border-[.1px] border-[#494949] rounded-sm'>
            <div className='relative'>
                <div onClick={() => setBanActive(false)} className='absolute top-0 right-3 text-lg text-gray-600'>x</div>
                <div className='flex justify-between p-5 items-center'>
                    <div className='flex'>
                        <div className='bg-blue-700 mr-3 w-[50px] h-[50px] rounded-full'></div>
                        <div className='flex flex-col justify-center'>
                            <div className=' text-lg font-bold'>username</div>
                            <div className=' text-xs'>dkdk</div>
                        </div>
                    </div>
                    <div>
                        🔴
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BanActive
