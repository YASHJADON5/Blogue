import React,{useEffect} from 'react'
import axios from 'axios'

const base_url= import.meta.env.VITE_BASE_URL

function SavedBlogs() {
  
  useEffect(()=>{
     
    (async()=>{
      
      try{
        const blogs= await axios.get(`${base_url}/api/v1/fetchSavedBlogs`,{
          headers:{
            "authorization":localStorage.getItem('token')
          }
        })

        console.log(blogs.data)

      }
      catch(e){
        console.log("error while fetching saved blogs"+e)
      }

    })()

  })


  return (
    <div>
      saved blogs
        
    </div>
  )
}

export default SavedBlogs
