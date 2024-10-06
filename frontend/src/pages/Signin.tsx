import { useState } from 'react'
import SigninLeft from '../components/SigninPage-comp/SigninLeft'
import SigninRight from '../components/SigninPage-comp/SigninRight'
import spinner from '../assets/spinner.svg'




function Signin() {
  
  const [loading,setLoading]= useState(false);
  console.log("p-render");

  return (
    <div>
        
        {loading &&<div className='h-screen w-screen absolute z-2 bg-white bg-opacity-55  flex justify-center items-center'>
                    <div className='z-3'>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>}
        

        
        <div className='grid grid-cols-2 z-1'> 
        <div><SigninLeft setLoading={setLoading} /></div>
        <div className='hidden lg:block'>
        <SigninRight />
        </div>
        </div>
          

        
    </div>
  )
}

export default Signin
