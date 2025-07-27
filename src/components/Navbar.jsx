import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white p-4 flex justify-between items-center'>

        <div className='font-bold text-white text-2xl'>
            <span className='text-green-700'>&lt;</span>
            Vaul
              <span className='text-green-700'>to\&gt;</span>
        </div>

        <div>
        <button className='flex px-4 py-2 bg-green-700 text-white rounded-lg items-center gap-3 cursor-pointer'>
           <img className='invert w-5' src="/github.svg" alt="GitHub" />Github
        </button>
        </div>
    </nav>
  )
}

export default Navbar
