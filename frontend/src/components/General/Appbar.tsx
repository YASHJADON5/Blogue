import React from 'react'
import Avatar from '../Blogs-comp/Avatar'


function Appbar() {
  return (
    <div className='flex justify-between p-4 border-b-2 border-slate-300'>
        <div className='pl-4 text-lg font-semibold'>
          Blogue  
        </div> 
        <div className='flex pr-4 items-center '>
            <div>
            <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
            </div>
            <div className='mb-2'>
            <Avatar name={"Y"} hsize='h-10' wsize='w-10'/>
            </div>
        </div>
       
    </div>
  )
}

export default Appbar
