import React from 'react'

const Matching = () => {
  return (
    <div className='flex h-screen w-full flex-col'>
        <div className='flex flex-col h-full w-full justify-center items-center text-black'>
            <h1 className='text-5xl font-semibold'>
                <span >Matching now...</span>
            </h1>
            <h3 className='text-lg text-center mt-4'>
                <span>This may take a bit.</span>
            </h3>
            <span className="loading loading-spinner mt-4 loading-lg"></span>
        </div>
    </div>
  )
}

export default Matching