import React from 'react'
import Avatar from './Avatar'
import Circle from './Circle'
import { Link } from 'react-router-dom'



function BlogCard({
    AvatarName,
    name,
    publishDate,
    title,
    content,
    id
  
}:{ AvatarName:string,
    name:string,
    publishDate:string,
    title:string,
    content:string,
    id:string
    
}) {

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
              {`${content.slice(0,150)}...`}
        </div>

        <div className='pt-2 text-gray-400 text-sm'>
        {`${Math.ceil(content.length/100)} minutes read`}
        </div>

    </div>
  )
}

export default BlogCard
