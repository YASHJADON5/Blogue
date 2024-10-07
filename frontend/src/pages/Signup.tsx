import { useState } from 'react'
import SignupRight from '../components/SignupPage-comp/SignupRight'
import SignupLeft from '../components/SignupPage-comp/SignupLeft'
import spinner from '../assets/spinner.svg'
import '../App.css'





function Signup() {
  const[loading,setLoading]=useState<boolean>(false);

  return (
    <div className=''>
        {loading && 
            <div className='h-screen w-screen absolute z-2 bg-purple-500 bg-opacity-55  flex justify-center items-center'>
                    <div className='z-3'>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>}

        <div className=' inset-0 md:grid md:grid-cols-2 z-1'>
         <div className='font-extrabold text-white text-3xl absolute top-6 w-full text-center lg:hidden md:hidden'>Blogue</div>
        <div><SignupLeft setLoading={setLoading} /></div>
        <div className='hidden md:block'>
        <SignupRight />
        </div>
        </div>
        

        
    </div>
  )
}

export default Signup

  