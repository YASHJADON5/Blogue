import { useEffect, useState } from 'react'
import Appbar from '../components/General/Appbar'
import axios from 'axios'
import spinner from '../assets/spinner.svg'
import BlogCard from '../components/Blogs-comp/BlogCard'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addmyBlogsSaved } from '../store/savedBlogSlice'


const base_url= import.meta.env.VITE_BASE_URL

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
}

interface myBlogs{
  name:string,
  Blogs:blog[]
}


interface savedPageBlogsArray{
  blog:blog
  user:User 
}



interface innerRoot{
  savedBlogs:blogId[],
  savedPageBlogs:savedPageBlogsArray[],
  singleBlogSaved:string,
  myBlogsSaved:blogId[]
}


interface Root{
   savedBlogs:innerRoot
}

function MyBlogs() {
  const selector= useSelector((state:Root)=>state.savedBlogs.myBlogsSaved)
   const dispatch= useDispatch()
  const [myBlogs,setMyBlogs] = useState<myBlogs>()
  const [loading,setLoading]= useState(false)
  const [name,setName]= useState<string>("")
  const [savedpost,setSavedPost]= useState<blogId[]|[]>([])

  useEffect(()=>{
    setLoading(true)
    const token= localStorage.getItem('token')
    const fetchMyBlogs=async()=>{
      try{
        const response= await axios.get(`${base_url}/api/v1/user/myblogs`,{
          headers:{
            "authorization":token
          }
        })
        setMyBlogs(response.data)
        setName(response.data.name)
        const savedBlogs = await axios.get(`${base_url}/api/v1/fetchSavedBlogs`, { headers: { "authorization": token } });
        setSavedPost(savedBlogs.data);
        dispatch(addmyBlogsSaved(savedBlogs.data))
        console.log(response.data)
        
  
      }
      catch(e){
        console.log("error while fetching my blogs",e)
      }
      finally{
        setLoading(false);
      }
     
    }
    fetchMyBlogs()
    
  },[selector.length])


  if(loading){
    return (
      <div className='h-screen w-screen absolute z-2 bg-purple-700  flex justify-center items-center'>
               <div className='z-3'>
                 {<img className='h-36 w-24' src={spinner}/>}
               </div>
      </div>
      )
  }
  console.log(savedpost)

  const username= localStorage.getItem('username')||""



  return (
    <div>
      <Appbar name={username[0]||""} id={''} publish={'regular'} content='' title=''/>
      {myBlogs&& <div className="mx-auto max-w-2xl">
        
        {myBlogs.Blogs.map((blog,index)=>{
          const isSaved=savedpost?.length!==0? savedpost?.some((blogId)=>blogId.blogId===blog.id):true
          return (
           <BlogCard 
           key={index}
           savedBlogs={isSaved}
           content={blog.content}   
           AvatarName={name[0]}
           title={blog.title}
           name={name}
           publishDate={blog.date}
           id={blog.id}
           page={"myblogs"}

           />
          )
        })}


      </div>}
       
    </div>
  )
}

export default MyBlogs