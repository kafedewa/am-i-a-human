import React from 'react'

const Matching = () => {
  return (
    <div>

        <div className='flex flex-col items-center text-black pt-32'>
            <h1 className='text-6xl font-semibold'>
                <span >Matching now...</span>
            </h1>
            <h3 className='text-lg text-center mt-4'>
                <span>This may take a bit.</span>
            </h3>
            <span className="loading loading-spinner mt-10 loading-lg"></span>

        </div>

    </div>
  )
}

export default Matching