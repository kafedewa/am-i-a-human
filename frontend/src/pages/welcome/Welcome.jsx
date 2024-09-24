import React from 'react'

const Welcome = () => {
  return (
    <div className='text-black'>
        <div className='flex flex-col items-center'>
            <h1 className='text-8xl font-semibold text-center'>
                <span >Am I a Human?</span>
            </h1>
            <h3 className='text-lg text-center mt-4'>
                <span>Chat with another.  Decide if they are human.</span>
            </h3>
            <button class="btn btn-outline mt-10">Enter Here</button>
        </div>

        <footer class="footer footer-center p-4 fixed inset-x-0 bottom-0">
            <aside>
                <p>A project by <a class="link link-neutral" href='https://kaylafedewa.com'>Kayla Fedewa</a></p>
            </aside>
        </footer>
    </div>
  )
}

export default Welcome