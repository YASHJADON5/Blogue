import React from 'react'
import SignupRight from '../components/SignupPage-comp/SignupRight'
import SignupLeft from '../components/SignupPage-comp/SignupLeft'



function Signup() {
  return (
    <div>
        <div className='grid grid-cols-2'>
            <SignupLeft />
            <div className='hidden lg:block'>
            <SignupRight />
            </div>
        </div>
    </div>
  )
}

export default Signup
