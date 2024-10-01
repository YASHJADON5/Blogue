import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addBlogs } from '../store/blogSlice'
import { addSavedBlogs } from '../store/savedBlogSlice'

const base_url= import.meta.env.VITE_BASE_URL

interface Author{
    name:string
}
  
  
  interface Blog {
     
    title:string,
    content:string,
    date:string,
    author:Author,
    id:string,
  
  }
  interface SavedBlog {
    blogId: string;
    userId: string;
  }
 

function useBlogs({savedState}:{savedState:boolean}) : { blogs: Blog[], loading: boolean, savedBlogIds: SavedBlog[] } {
    const dispatch=useDispatch()
   
    const [blogs,setBlogs]= useState<Blog[]>([])
    const [loading,setLoading]=useState<boolean>(true)
    const [savedBlogIds, setSavedBlogIds] = useState<SavedBlog[]>([]);


    useEffect(()=>{
        (async()=>{
            setLoading(true)
            
            try{
                const token= localStorage.getItem('token')
                const response=await axios.get(`${base_url}/api/v1/blog/bulk`,{
                    headers:{
                        "authorization":token
                    }
                })
                setBlogs(response.data.blogs);
                dispatch(addBlogs(response.data.blogs));
                
                const res = await axios.get(`${base_url}/api/v1/fetchSavedBlogs`, { headers: { "authorization": token } });
               
                setSavedBlogIds(res.data);
                dispatch(addSavedBlogs(res.data))
                console.log(res.data);


                setLoading(false);

            }
            catch(e){
               console.log("useBlogs catch error", e)
            }

        })()

    },[savedState])

    return {blogs,loading,savedBlogIds};
 
}

export default useBlogs

