import { useState } from 'react'
import Avatar from '../Blogs-comp/Avatar'
import { Link, useNavigate } from 'react-router-dom'
import spinner from '../../assets/spinner.svg'
import axios from 'axios'

const base_url= import.meta.env.VITE_BASE_URL


function Appbar({publish, content, title}:{publish:string|"",content:string|"",title:string|""}) {
  const[signoutBox,setSignoutBox]= useState(false);
  const navigate= useNavigate()
  const[loading,setLoading]= useState(false);
   
  const handlePublish=()=>{
        navigate('/publish');
  }
  const handleFinalPublish = async () => {
    
    setLoading(true);

    
      try {
        const response = await axios.post(`${base_url}/api/v1/blog`, {
          title: title,
          content: content
        }, {
          headers: {
            "authorization": localStorage.getItem('token')
          }
        });
  
        console.log(response.data);
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
    navigate('/')
  }

  const handleSavedblogs=()=>{
    navigate('/savedblogs')
    
  }
  

  return (
     <div>
          { loading &&  <div className='h-screen w-screen absolute z-50 bg-white bg-opacity-55  flex justify-center items-center'>
            <div className='z-3'>
              {<img className='h-36 w-24' src={spinner}/>}
            </div>
     </div> }

    <div className='flex justify-between p-4 border-b-2 border-slate-300'>
      <Link to={'/blogs'}>
        <div className='pl-4 text-lg font-semibold hover:scale-110 transition ease-linear duration-500'>
          Blogue  
        </div> 
      </Link>
        <div className='flex pr-4 items-center '>
            <div className='flex'>
            {publish=="regular"? <button onClick={handlePublish} type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
            :<button onClick={handleFinalPublish} type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>}
            <div className='mb-2 cursor-pointer' onClick={hnadleclick}>
            
            <Avatar name={"Y"} hsize='h-10' wsize='w-10'/>
            </div>
            {signoutBox&&
            <div className='h-1/3 w-1/6 bg-white absolute mt-3 right-10 rounded-md shadow-xl cursor-pointer '>
              <ul className='p-5 pl-6'>
              <li className="text-[#9f9c9c] hover:text-[#515050] transition duration-200 ease-in-linear font-semibold">My Blogs</li>
              <li onClick={handleSavedblogs} className="text-[#9f9c9c] hover:text-[#515050] transition duration-200 ease-in-linear font-semibold">Saved Blogs</li>
              <li onClick={handleSignoutCLick} className="text-[#9f9c9c] hover:text-[#515050] transition duration-200 ease-in-linear font-semibold">Sign out</li>
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
