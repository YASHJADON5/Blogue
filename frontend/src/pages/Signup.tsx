import React, { useState } from 'react'
import SignupRight from '../components/SignupPage-comp/SignupRight'
import SignupLeft from '../components/SignupPage-comp/SignupLeft'
import spinner from '../assets/spinner.svg'





function Signup() {
  const[loading,setLoading]=useState<boolean>(false);

  return (
    <div>
        {loading && <div className='grid grid-cols-2 z-1'>
             <div><SignupLeft setLoading={setLoading} /></div>
            <div className='hidden lg:block'>
            <SignupRight />
            </div>
            <div className='h-screen w-screen absolute z-2 bg-white bg-opacity-55  flex justify-center items-center'>
                    <div className='z-3'>
                      {<img className='h-36 w-24' src={spinner}/>}
                    </div>
           </div>
        </div>}

        {!loading&&
        <div className='grid grid-cols-2 z-1'>
        <div><SignupLeft setLoading={setLoading} /></div>
        <div className='hidden lg:block'>
        <SignupRight />
        </div>
        </div>
          }

        
    </div>
  )
}

export default Signup

  