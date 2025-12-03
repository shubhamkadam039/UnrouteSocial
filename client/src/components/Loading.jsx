import React from 'react'

const Loading = ({height = '100vh'}) => {
  return (
    <div style={{height}} className='flex item-centre justify-centre h-screen'>
        <div className='w-10 h-10 rounded-full border-3 border-orange-500 border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading