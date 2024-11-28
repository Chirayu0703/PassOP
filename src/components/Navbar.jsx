import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-green-600 text-white h-15' >
        <div className="mycontainer flex justify-between items-center px-4 h-10">
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-700'>&lt;</span>
                <span>Pass</span><span className='text-black'>OP/&gt;</span>
            </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='rounded-full bg-green-400'>
                    <img className='rounded-full p-3 w-20 px-0 py-0 ' src="Github.png" alt="" />
                </button>
            </div>
    </nav>
  )
}

export default Navbar