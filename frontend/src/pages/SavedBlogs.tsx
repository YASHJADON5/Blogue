import {useEffect, useState} from 'react'
import axios from 'axios'
import spinner from '../assets/spinner.svg'
import BlogCard from '../components/Blogs-comp/BlogCard'
import Appbar from '../components/General/Appbar'

interface Author{
  name:string
}


interface Blogs {
   
  title:string,
  content:string,
  date:string,
  author:Author
  id:string
  savedBy:[]

}


const base_url= import.meta.env.VITE_BASE_URL

function SavedBlogs() {

  const [savedBlogs,setSavedBlogs]= useState<Blogs[]>([])
  const [loading,setLoading]= useState(false);
  
  useEffect(()=>{
    setLoading(true);
     
    (async()=>{
      
      try{
        const blogs= await axios.get(`${base_url}/api/v1/fetchSavedBlogs`,{
          headers:{
            "authorization":localStorage.getItem('token')
          }
        })

        setSavedBlogs(blogs.data)

        console.log(blogs.data)

      }
      catch(e){
        console.log("error while fetching saved blogs"+e)
      }
      finally{
        setLoading(false);
      }

    })()
  },[])
  console.log(savedBlogs)

  if(loading){
     return (
           <div className='h-screen w-screen absolute z-2 bg-white bg-opacity-55  flex justify-center items-center'>
                    <div className='z-3'>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>
           )
  }


  return (
    <div>

    
     
          {savedBlogs&&<div>
            <Appbar publish={"saved"} content={''} title={''}/>
            <div className='flex flex-col items-center '>
              <div className='max-w-xl'>  
                {savedBlogs.map((blog,index)=>{
                  return <BlogCard savedBy={blog?.savedBy} key={index} page={"SingleBlog"} id={blog.id} AvatarName={blog.author?.name[0]} name={blog.author?.name} publishDate={blog.date} title={blog.title} content={blog.content} />
                })}        
            </div>
            </div>
          </div>}


    </div>
    
     
        
    
  )
}

export default SavedBlogs
