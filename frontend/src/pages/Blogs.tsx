import React, { useState } from 'react'
import BlogCard from '../components/Blogs-comp/BlogCard'
import Appbar from '../components/General/Appbar'
import useBlogs from '../hooks/useBlogs'
import spinner from '../assets/spinner.svg'
import handleSave from '../utils/handleSave'
import handleUnSave from '../utils/handleUnSave'



interface Author{
  name:string,
}


interface Blog {
   
  title:string,
  content:string,
  date:string,
  author:Author
  id:string,


}
interface SavedBlog {
  blogId: string;
  userId: string;
}




function Blog() {
  
  // const [SavedLoading,setSavedLoading]=useState(false);
  const [savedState,setSavedState]= useState(false);
  const {blogs,loading, savedBlogIds} : { blogs: Blog[], loading: boolean ,savedBlogIds:SavedBlog[] }= useBlogs({savedState});
  // console.log(blogs)
  
  if(loading){
          return(
            <div className='h-screen w-screen absolute z-2 bg-white bg-opacity-55  flex justify-center items-center'>
                    <div className='z-3'>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>
          )
  }

  return (
    <div>
    <Appbar publish={"regular"} content={''} title={''}/>
    <div className='flex flex-col items-center '>
      <div className='max-w-xl'>  
       
        {blogs.map((blog,index)=>{
            const isSaved = savedBlogIds.some(saved => saved.blogId === blog.id);
           return <BlogCard 
           setsavedState={setSavedState}
           savedBlogs={isSaved} 
           key={index} 
           page={"landingpage"} 
           id={blog.id} 
           AvatarName={blog.author?.name[0]} 
           name={blog.author?.name}
            publishDate={blog.date} 
            title={blog.title} 
            content={blog.content} />
        })}        
     </div>
    </div>
  </div>
  )
}

export default Blog

