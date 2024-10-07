import { useState } from 'react'
import Avatar from '../Blogs-comp/Avatar'
import { useNavigate } from 'react-router-dom'
import spinner from '../../assets/spinner.svg'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addSingleBlogSaved } from '../../store/savedBlogSlice'



const base_url= import.meta.env.VITE_BASE_URL




function Appbar({publish, content, title, id,name }:{publish:string|"",content:string|"",title:string|"", id:string|"",name:string}) {
  
  const[signoutBox,setSignoutBox]= useState(false);
  const navigate= useNavigate()
  const[loading,setLoading]= useState(false);
  const dispatch= useDispatch()
  // const selector= useSelector((state:user)=>state.user.username)

   
  const handlePublish=()=>{
        navigate('/publish');
  }
  

  const handleFinalPublish = async () => {
  

     
    if(title===""||content===""){
      alert("Please fill empty values")
      return;
    }
      setLoading(true);  
      try {
         await axios.post(`${base_url}/api/v1/blog`, {
          title: title,
          content: content
        }, {
          headers: {
            "authorization": localStorage.getItem('token')
          }
        });
  
     
        navigate('/blogs');
      } catch (e) {
        console.log(e);
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    
  };

  const hnadleclick=()=>{
    setSignoutBox(prev=>!prev)
  }
  function handleSignoutCLick(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/')
  }

  const handleSavedblogs=()=>{
    navigate('/savedblogs')
    
  }

  const handleMyBlogs=()=>{
    navigate('/myblogs')
  }

  const handleDelete=async()=>{
    setLoading(true);
    const token = localStorage.getItem('token')
       
    try{

       await axios.delete(`${base_url}/api/v1/delete/${id}`,{
        headers:{
          "authorization":token
        }
      })
      
      navigate('/myblogs')

    }
    catch(e){
      console.log("error while deleting the blog",e)
    }
    finally{
      setLoading(false)
    }

  }

  const handleUpdate=async()=>{

    setLoading(true);
    const token = localStorage.getItem('token')
       
    try{

       await axios.put(`${base_url}/api/v1/blog`,{
        id:id,
        title:title,
        content:content
      },{
        headers:{
          "authorization":token
        }
      })
      
      navigate(`/myblogs`)

    }
    catch(e){
      console.log("error while updating the blog",e)
    }
    finally{
      setLoading(false)
    }

  }

  const handleBlogueIconClick=()=>{
    dispatch(addSingleBlogSaved(""))
    navigate('/blogs')
    
  }
  

  return (
     <div>
          { loading &&  <div className='h-screen w-screen absolute z-50 bg-purple-700 bg-opacity-80  flex justify-center items-center'>
            <div className='z-3'>
              {<img className='h-36 w-24' src={spinner}/>}
            </div>
     </div> }

    <div className='flex justify-between p-4 border-b-2 border-slate-300 bg-purple-700'>
     
        <div onClick={handleBlogueIconClick} className='pl-4 text-3xl text-white md:text-4xl font-semibold hover:scale-110 transition ease-linear duration-500 cursor-pointer my-auto'>
          Blogue  
        </div> 
    
        <div className='flex pr-4   '>

            <div className="flex " >

              <div className={`${publish === 'SingleBlogMyBlogs' ? 'hidden' : 'block'} my-auto`}>
              {publish=="regular"|| publish==="saved"? <button onClick={handlePublish} type="button" className="  text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base md:text-sm px-6  py-2.5 md:px-5 md:py-2.5 text-center me-2">Publish</button>
              :<button onClick={handleFinalPublish} type="button" className=" text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full md:text-sm px-6 text-base  py-2.5 md:px-5 md:py-2.5 text-center me-2">Publish</button>}

             </div>
          
           {publish=='SingleBlogMyBlogs'&&<div>
            <button onClick={handleDelete} type="button" className="text-white my-auto bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-base md:text-sm px-6 md:px-5 py-2.5 text-center me-2 ">Delete</button>


            <button onClick={handleUpdate} type="button" className="text-white my-auto bg-[#ffbd03] hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-base md:text-sm px-6 md:px-5 py-2.5 text-center me-2">Update</button>
            </div>}

            <div className='cursor-pointer mt-0.5 md:mt-0' onClick={hnadleclick}>
             
            <Avatar name={name} hsize='h-10' wsize='w-10'/>
            </div>



            {signoutBox&&
            <div className=' z-10 h-1/3 w-44 md:w-1/6 bg-purple-500 absolute mt-16 right-10 rounded-md shadow-xl cursor-pointer '>
              <ul className='p-5 pl-6'>
              <li onClick={handleMyBlogs} className="text-white hover:text-gray-200 transition duration-200 ease-in-linear font-semibold">My Blogs</li>
              <li onClick={handleSavedblogs} className="text-white hover:text-gray-200 transition duration-200 ease-in-linear font-semibold">Saved Blogs</li>
              <li onClick={handleSignoutCLick} className="text-white hover:text-gray-200 transition duration-200 ease-in-linear font-semibold">Sign out</li>
              </ul>

            </div>
            }
            </div>
        </div>
       
    </div>

          

</div>
  )
}

export default Appbar
