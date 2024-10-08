import {useEffect, useState} from 'react'
import axios from 'axios'
import spinner from '../assets/spinner.svg'
import BlogCard from '../components/Blogs-comp/BlogCard'
import Appbar from '../components/General/Appbar'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addSavedPageBlogs } from '../store/savedBlogSlice'
import { useNavigate } from 'react-router-dom'



interface blogId{
  blogId:string
}

interface User{
  name:string
}

interface blog{
  id:string,
  title:string,
  content:string,
  authorId:string,
  date:string,
  publish:boolean,
  author:{
    name:string
  }
}


interface savedPageBlogsArray{
  blog:blog
  user:User 
}



interface innerRoot{
  savedBlogs:blogId[],
  savedPageBlogs:savedPageBlogsArray[],
  singleBlogSaved:string,
}

interface Root{
   savedBlogs:innerRoot
}


interface user{
  name:string
}

interface SavedBlogsArray{
  blogId:string,
  userId:string,
  user:user,
  blog:blog

}





const base_url= import.meta.env.VITE_BASE_URL

function SavedBlogs() {
  const navigate=useNavigate()
  const [savedBlogs,setSavedBlogs]= useState<SavedBlogsArray[]>([])
  const [loading,setLoading]= useState(false);
  const dispatch= useDispatch()
  const selector= useSelector((state:Root)=>state.savedBlogs.savedPageBlogs);
  const token=localStorage.getItem('token')
  
  useEffect(()=>{
    setLoading(true);
     
    (async()=>{
      
      try{
        const blogs= await axios.get(`${base_url}/api/v1/savedbyuser`,{
          headers:{
            "authorization":localStorage.getItem('token')
          }
        })

        dispatch(addSavedPageBlogs(blogs.data))
        setSavedBlogs(blogs.data)

      

      }
      catch(e){
        console.log("error while fetching saved blogs"+e)
      }
      finally{
        setLoading(false);
      }

    })()
  },[selector.length])
  
  if(!token){
    navigate('/signin')
  }

 
  if(loading){
     return (
           <div className='h-screen w-screen absolute z-2 bg-purple-700  flex justify-center items-center'>
                    <div className='z-3'>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>
           )
  }
  
  const username= localStorage.getItem('username')||""
 
  


  return (
    <div>

    
     
            <Appbar name={username[0]||""} id={''} publish={"saved"} content={''} title={''}/>
          {savedBlogs&&<div  className='mx-auto w-full  md:max-w-2xl'>
            {/* <div className='flex flex-col items-center '> */}
             
                {savedBlogs.map((blog,index)=>{
                  return <BlogCard savedBlogs={true}  
                  key={index} page={"SingleBlog"}
                   id={blog.blog.id}
                    AvatarName={blog.blog.author?.name[0]} 
                    name={blog.blog.author?.name} 
                    publishDate={blog.blog.date} 
                    title={blog.blog.title} 
                    content={blog.blog.content} />
                })}        
           
            {/* </div> */}
          </div>}


    </div>
    
     
        
    
  )
}

export default SavedBlogs
