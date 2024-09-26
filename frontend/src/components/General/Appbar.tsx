import React, { useState } from 'react'
import Avatar from '../Blogs-comp/Avatar'
import { Link, useNavigate } from 'react-router-dom'


function Appbar() {
  const[signoutBox,setSignoutBox]= useState(false);
  const navigate= useNavigate()
  const hnadleclick=()=>{
    setSignoutBox(prev=>!prev)
  }
  function handleSignoutCLick(){
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='flex justify-between p-4 border-b-2 border-slate-300'>
      <Link to={'/blogs'}>
        <div className='pl-4 text-lg font-semibold'>
          Blogue  
        </div> 
      </Link>
        <div className='flex pr-4 items-center '>
            <div>
            <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
            </div>
            <div className='mb-2 cursor-pointer' onClick={hnadleclick}>
             
            <Avatar name={"Y"} hsize='h-10' wsize='w-10'/>
            {signoutBox&&
            <div className='h-1/3 w-1/6 bg-white absolute mt-3 right-10 rounded-md shadow-xl '>
              <ul className='p-5 pl-6'>
              <li className="text-[#9f9c9c] hover:text-[#515050] transition duration-200 ease-in-linear font-semibold">Saved Blogs</li>
              <li onClick={handleSignoutCLick} className="text-[#9f9c9c] hover:text-[#515050] transition duration-200 ease-in-linear font-semibold">Signout</li>
              </ul>

            </div>
            }
            </div>
        </div>
       
    </div>
  )
}

export default Appbar
