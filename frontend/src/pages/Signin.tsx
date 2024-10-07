import { useState } from 'react'
import SigninLeft from '../components/SigninPage-comp/SigninLeft'
import SigninRight from '../components/SigninPage-comp/SigninRight'
import spinner from '../assets/spinner.svg'




function Signin() {
  
  const [loading,setLoading]= useState(false);
  console.log("p-render");

  return (
    <div>
        
        {loading &&<div className='h-screen w-screen absolute z-2 bg-purple-500 bg-opacity-55  flex justify-center items-center'>
                    <div className='z-3'>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>}
        

        
        <div className='md:grid md:grid-cols-2 z-1'> 
        <div className='font-extrabold text-white text-3xl absolute top-6 w-full text-center lg:hidden md:hidden'>Blogue</div>
        <div><SigninLeft setLoading={setLoading} /></div>
        <div className='hidden lg:block'>
        <SigninRight />
        </div>
        </div>
          

        
    </div>
  )
}

export default Signin
