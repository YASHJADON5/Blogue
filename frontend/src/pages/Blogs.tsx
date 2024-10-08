import BlogCard from '../components/Blogs-comp/BlogCard'
import Appbar from '../components/General/Appbar'
import useBlogs from '../hooks/useBlogs'
import spinner from '../assets/spinner.svg'
import { useNavigate } from 'react-router-dom'




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
  const navigate=useNavigate()
  const token= localStorage.getItem('token')
  const {blogs,loading, savedBlogIds} : { blogs: Blog[], loading: boolean ,savedBlogIds:SavedBlog[] }= useBlogs();
    
  if(loading){
          return(
            <div className='h-screen w-screen absolute  bg-purple-700  flex justify-center items-center'>
                    <div className=''>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>
          )
  }
  const username= localStorage.getItem('username')||""

  if(!token){
    navigate('/signin')
  }



  return (
    <div className=''>
    <Appbar name={username[0]||""}  id={""} publish={"regular"} content={''} title={''}/>
    <div className='flex flex-col items-center'>
      <div className=' w-full md:w-1/2'>  
       
        {blogs.map((blog,index)=>{
            const isSaved = savedBlogIds.some(saved => saved.blogId === blog.id);
           return <BlogCard 
         
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

