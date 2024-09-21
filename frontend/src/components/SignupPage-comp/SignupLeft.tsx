import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {signUpInputType,signUpBody} from 'blogue-common'
import InputBox from '../input-comp/InputBox'
import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL;


function SignupLeft() {
    const [showError,setShowError]=useState({
      showNameError:true,
      showEmailError:true,
      showPasswordError:true
    });
    const [isSubmitted,setIsSubmitted]= useState(false);
    const [loading,setLoading]=useState(false);
    const [signUpInputs,setsignUpInputs]= useState<signUpInputType>({
      name:'',
      email:'',
      password:''
    })
    const [error,setErrors] =useState({
         nameError:'',
         emailError:'',
         passwordError:''       
    })

    const handleForm=async()=>{
      setShowError((prev)=>{
            return {
               ...prev,
               showNameError:true,
               showEmailError:true,
               showPasswordError:true
            }
      });
      setLoading(true);
      if(!signUpInputs.name){
        console.log("y")
               setErrors((preverror)=>{
                return {
                ...preverror,
                nameError:"Name is missing"
              }
               })
      }
      if(!signUpInputs.email){
        console.log("a")
               setErrors((preverror)=>{
                return {
                ...preverror,
                emailError:"Email is missing"
              }
               })
      }
      if(!signUpInputs.password){
        console.log("s")
        setErrors((preverror)=>{
          return {
          ...preverror,
          passwordError:"password is missing"
        }
         })             
        
      }

      if(signUpInputs.name==''||signUpInputs.email==''||signUpInputs.password==''){
        setLoading(false)
        console.log(error, 1)
        return 
      }
   
      
      const result= signUpBody.safeParse(signUpInputs);
      
      if(!result.success){
        console.log("input data is errounous")
        console.log(result.error.issues);
        const issues=result.error.issues;

        const updatedErrors={
          nameError:'',
          emailError:'',
          passwordError:''   
        }
        

      issues.forEach((issue)=>{
        if(issue.path[0]==='name'){
          updatedErrors.nameError=issue.message
        }
        if(issue.path[0]==='email'){
          const res = updatedErrors.emailError=issue.message
          console.log(res)
        }
        if(issue.path[0]==='password'){
          updatedErrors.passwordError=issue.message
        }
      })
        console.log("hi")
        setErrors(updatedErrors)
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
        setErrors((preverror)=>{
          return {
            ...preverror,
            nameError:'',
            emailError:'',
            passwordError:'' 
          }
        })
        
         
      }
      catch(e){
        console.log('catch block', e);
      }
      finally{
        
        setLoading(false);

      }

    }

if(loading){
  return (<div className='h-screen flex justify-center items-center'>Loading...</div>);
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
                          setsignUpInputs({
                            ...signUpInputs,
                            name:e.target.value
                          })
                          if(e.target.value){
                             setShowError((prev)=>{
                                      return {
                                        ...prev,
                                        showNameError:false
                                      }
                             });    
                          }
                          else{
                            setShowError((prev)=>{
                              return {
                                ...prev,
                                showNameError:true
                              }
                     });    
                          }
                        }} />
                         {error.nameError && showError.showNameError&& <div className='text-red-500 text-lg px-8'>{error.nameError}</div>}
                         <InputBox label={'Email'} placeholder={'example@gmail.com'} value={signUpInputs.email} onChange={(e)=>{
                                 setsignUpInputs({
                                  ...signUpInputs,
                                  email:e.target.value
                                })
                                if(e.target.value){
                                  setShowError((prev)=>{
                                    return {
                                      ...prev,
                                      showEmailError:false
                                    }
                           });    
                               }
                               else{
                                setShowError((prev)=>{
                                  return {
                                    ...prev,
                                    showEmailError:true
                                  }
                         });    
                               }
                                
                        }} />
                        {error.emailError &&showError.showEmailError&&<div className='text-red-500 text-lg px-8'>{error.emailError}</div>}
                         <InputBox label={'Password'} placeholder={'abc@@ABC124'} value={signUpInputs.password} onChange={(e)=>{
                                 setsignUpInputs({
                                  ...signUpInputs,
                                  password:e.target.value
                                })
                                if(e.target.value){
                                  setShowError((prev)=>{
                                    return {
                                      ...prev,
                                      showPasswordError:false
                                    }
                           });      
                               }
                               else{
                                setShowError((prev)=>{
                                  return {
                                    ...prev,
                                    showPasswordError:true
                                  }
                         });    
                               }
                        }} />
                         {error.passwordError &&showError.showPasswordError&&<div className='text-red-600 text-lg px-8'>{error.passwordError}</div>}
                       
                        <div className='px-8'>
                        <button onClick={handleForm} className='bg-[#1F1F1F] text-white  w-full mt-6 p-3 rounded-md hover:bg-black transition ease-in'>Sign Up</button>
                        </div>
                        


                   






                  </div>

           </div>   
    </div>
  )
}

export default SignupLeft
