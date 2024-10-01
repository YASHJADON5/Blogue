import React, { useState } from 'react'
import Avatar from './Avatar'
import Circle from './Circle'
import { Link } from 'react-router-dom'
import saveIcon from '../../assets/saveIcon.svg'
import unsaveIcon from '../../assets/unssaveIcon.svg'
import axios from 'axios'
import spinner from '../../assets/spinner.svg'
import handleSave from '../../utils/handleSave'
import handleUnSave from '../../utils/handleUnSave'



const base_url= import.meta.env.VITE_BASE_URL



function BlogCard({
    AvatarName,
    name,
    publishDate,
    title,
    content,
    id,
    page,
    savedBlogs,
    setsavedState
  
}:{ AvatarName:string,
    name:string,
    publishDate:string,
    title:string,
    content:string,
    id:string,
    page:string,
    savedBlogs:boolean,
    setsavedState:React.Dispatch<React.SetStateAction<boolean>>
    
    
}) {
  // console.log(savedBy);
  const [loading,setLoading]=useState(false);
   
  const onSave= async()=>{
    // setLoading(true)
    await handleSave({setLoading,id,setsavedState})
    // setsavedState(prev=>!prev)
    // setTimeout(()=>{
      // setLoading(false)

    // },1000)

  }
  const onUnSave= async()=>{
    
    await handleUnSave({setLoading,id,setsavedState})

  }
 



  if(loading){
    return(
      <div className='fixed inset-0 z-10 bg-white   flex justify-center items-center'>
              <div className='z-20'>
                {<img className='h-36 w-24' src={spinner}/>}
              </div>
     </div>
    )
}
  

    

  return (
    <div className='p-4 border-b border-slate-300'>
        <div className='flex items-center'>
                <div className='mb-1'>
                    <Avatar name={AvatarName} hsize='h-6' wsize='w-6' />
                </div>

                <div className='pl-2 text-sm mb-1'>
                    {name}
                </div>
                <div className='flex items-center  pl-2 h-5'>
                  <Circle />
                </div>
                <div className='pl-2 text-sm  mb-1 text-gray-400'>
                    {publishDate}
                </div>
        </div>
        <Link to={`/blog/${id}`}>
        <div className='pt-2 font-bold text-2xl font-sans hover:cursor-pointer'>
        {title}
        </div>
        </Link>
        <div className='text-gray-500 font-lg pt-2'>
              {page==="SingleBlog"?content:`${content.slice(0,150)}...`}
        </div>
         <div className='flex justify-between'>
              <div className='pt-2 text-gray-400 text-sm'>
              {`${Math.ceil(content.length/100)} minutes read`}
              </div>
              
              {!savedBlogs&&<div>
                 <img className='h-6 w-6 mt-2 ml-6' onClick={onSave} src={saveIcon} alt="" />
              </div>}
              {savedBlogs&&<div>
                  <img className='h-6 w-6 mt-2 ml-6' onClick={onUnSave} src={unsaveIcon} alt="" />
              </div>}
        </div>

    </div>
  )
}

export default BlogCard
