import  { useState,useRef, useEffect,  } from 'react'
import Appbar from '../components/General/Appbar'
import RichTextEditor from '../components/RichTextEditor/RichtextEditor'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import spinner from '../assets/spinner.svg'

const base_url= import.meta.env.VITE_BASE_URL


function SingleBlogMyBlogs() {
  
  const [loading,setLoading]= useState(false)
  const {id}=useParams<{ id: string }>()

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

 const handleTitleChange = () => {
    if (inputRef.current) {
      setTitle(inputRef.current.value); 
    }
  };

  useEffect(()=>{
    setLoading(true);
      (async()=>{
        const token= localStorage.getItem('token')
        try{
            
            const response= await axios.get(`${base_url}/api/v1/blog/${id}`,{
                headers:{
                    "authorization":token
                }
            })
            setTitle(response.data.title)
            setContent(response.data.content)
    
        }
        catch(e){
           console.log("error while fething blog for update and delete",e)
        }
        finally{
            setLoading(false)
        }

        
    })()
  },[])


  if (loading) {
    return (
      <div className="h-screen w-screen absolute z-2 bg-purple-700 bg-opacity-80 flex justify-center items-center">
        <div className="z-3">
          <img className="h-36 w-24" src={spinner} />
        </div>
      </div>
    );
  }
   const username= localStorage.getItem('username')||""


  return (
    <div>
      <Appbar name={username[0]||""} id={id||""} publish={"SingleBlogMyBlogs"} title={title} content={content} />
      
      <div className='flex justify-center bg-white h-screen max-w-4xl mx-auto'>
        <div className="max-w-full w-full">
          <input
            ref={inputRef}
            onChange={handleTitleChange}
            className='w-full mx-auto bg-white outline-none border border-teal-800 p-4 h-20 text-4xl'
            placeholder='Title'
            type="text"
            value={title}
          />
          <RichTextEditor content={content} setContent={setContent} />
        </div>

        </div>




    </div>
  )
}

export default SingleBlogMyBlogs
