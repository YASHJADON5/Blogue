import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import spinner from '../assets/spinner.svg'

const base_url = import.meta.env.VITE_BASE_URL

interface Author{
  name:string
}


interface Blog {
   
  title:string,
  content:string,
  date:string,
  author:Author
  id:string

}
interface Blogs{
  blogs:Blog[] | null
}

interface RootState{
  blogs:Blogs
}

function SingleBlog() {
  const [loading,setLoading]= useState(true);
  const selector= useSelector((state : RootState)=>state.blogs)
  console.log("S",selector.blogs);
  
  const {id}=useParams()

  let [blog,setBlog]=useState<Blog|null>(null);
  useEffect(() => {
    if (!selector.blogs) {
      const fetchBlog = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`${base_url}/api/v1/blog/${id}`, {
            headers: { "authorization": token }
          });
          setBlog(response.data.msg);
        } catch (e) {
          console.log("Error fetching blog", e);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlog();
    } else {
      const filteredBlog = selector.blogs.find((blog) => blog.id === id);
      setBlog(filteredBlog || null);
      setLoading(false);
    }
  }, [selector.blogs, id]);
  
  

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
    <>
    <div>
      Yash
    </div>
    <div>
      {blog?.title}
      
    </div>
    <div>
      {blog?.content}
    </div>
    <div>
      {blog?.author.name[0]}
    </div>
    </>
  )
}

export default SingleBlog
