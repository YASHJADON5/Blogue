import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addBlogs } from '../store/blogSlice'

const base_url= import.meta.env.VITE_BASE_URL

interface Author{
    name:string
}
  
  
  interface Blogs {
     
    title:string,
    content:string,
    date:string,
    author:Author
    id:string
  
  }

function useBlogs() : { blogs: Blogs[], loading: boolean } {
    const dispatch=useDispatch()
   
    const [blogs,setBlogs]= useState<Blogs[]>([])
    const [loading,setLoading]=useState<boolean>(true)

    useEffect(()=>{
        (async()=>{
            
            try{
                const token= localStorage.getItem('token')
                const response=await axios.get(`${base_url}/api/v1/blog/bulk`,{
                    headers:{
                        "authorization":token
                    }
                })
                // console.log(response.data)
                setBlogs(response.data.blogs);
                dispatch(addBlogs(response.data.blogs));
                setLoading(false);

            }
            catch(e){
               console.log("useBlogs catch error", e)
            }

        })()

    },[])

    return {blogs,loading};
 
}

export default useBlogs

