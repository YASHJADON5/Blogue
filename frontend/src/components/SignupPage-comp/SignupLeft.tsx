import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {signUpInputType,signUpBody} from 'blogue-common'
import InputBox from '../input-comp/InputBox'
import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL;


function SignupLeft() {
  
    const [loading,setLoading]=useState(false);
    const[signUpInputs,setsignUpInputs]= useState<signUpInputType>({
      name:'',
      email:'',
      password:''
    })

    const handleForm=async()=>{
      setLoading(true);
      
      const {success}= signUpBody.safeParse(signUpInputs);
      // console.log(pa)
      if(!success){
        console.log("input data si errounous")
        setLoading(false);
        return 
      }

      try{
        const response=await axios.post(`${base_url}/api/v1/user/signup`, {
                  name:signUpInputs.name,
                  email:signUpInputs.email,
                  password:signUpInputs.password         
        })
        console.log(response);
        localStorage.setItem('token',response.data.jwt);
        

      }
      catch(e){
        console.log('catch block', e);
      }
      finally{
        setLoading(false);
      }

    }

if(loading){
  return <div className='h-screen flex justify-center items-center'>Loading...</div>
}


  return (
    <div className='bg-white h-screen'>
           <div className='flex justify-center items-center h-screen'>
                  
                  <div className=' h-96 w-96'>

                        <div className='text-center font-bold text-3xl'>Create an account
                        </div>

                        <div className='pt-2 text-center font-medium text-gray-500'>Already have an account? <Link className='underline font-medium' to={'/signin'}>Login</Link>
                        </div>
                        
                        <InputBox label={'Name'} placeholder={'Jason Roy'} value={signUpInputs.name} onChange={(e)=>{
                                return setsignUpInputs({
                                  ...signUpInputs,
                                  name:e.target.value
                                })
                        }} />
                         <InputBox label={'Email'} placeholder={'example@gmail.com'} value={signUpInputs.email} onChange={(e)=>{
                                return setsignUpInputs({
                                  ...signUpInputs,
                                  email:e.target.value
                                })
                        }} />
                         <InputBox label={'Password'} placeholder={'abc@@ABC124'} value={signUpInputs.password} onChange={(e)=>{
                                return setsignUpInputs({
                                  ...signUpInputs,
                                  password:e.target.value
                                })
                        }} />
                        <div className='px-8'>
                        <button onClick={handleForm} className='bg-[#1F1F1F] text-white  w-full mt-6 p-3 rounded-md hover:bg-black transition ease-in'>Sign Up</button>
                        </div>
                        


                   






                  </div>

           </div>   
    </div>
  )
}

export default SignupLeft
