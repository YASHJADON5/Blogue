import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {signInInputType,signInBody} from 'blogue-common'
import InputBox from '../SigninAnsSignupShared/input-comp/InputBox'
import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL;


function SigninLeft({setLoading}:{setLoading:(value:boolean)=>void}) {
    const navigate=useNavigate()
    const [showError,setShowError]=useState({
      showEmailError:true,
      showPasswordError:true
    });
    
    // const [loading,setLoading]=useState(false);
    const [signInInputs,setsignInInputs]= useState<signInInputType>({
      email:'',
      password:''
    })
    const [error,setErrors] =useState({
         emailError:'',
         passwordError:''       
    })

    const handleForm=async()=>{
      setShowError((prev)=>{
            return {
               ...prev,
               showEmailError:true,
               showPasswordError:true
            }
      });
      setLoading(true);
      if(!signInInputs.email){
        console.log("a")
               setErrors((preverror)=>{
                return {
                ...preverror,
                emailError:"Email is missing"
              }
               })
      }
      if(!signInInputs.password){
        console.log("s")
        setErrors((preverror)=>{
          return {
          ...preverror,
          passwordError:"password is missing"
        }
         })             
        
      }

      if(signInInputs.email==''||signInInputs.password==''){
        setLoading(false)
        console.log(error, 1)
        return 
      }
   
      
      const result= signInBody.safeParse(signInInputs);
      
      if(!result.success){
        console.log("input data is errounous")
        console.log(result.error.issues);
        const issues=result.error.issues;

        const updatedErrors={
          emailError:'',
          passwordError:''   
        }
        

      issues.forEach((issue)=>{
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
        const response=await axios.post(`${base_url}/api/v1/user/signin`, {
                  email:signInInputs.email,
                  password:signInInputs.password         
        })
        console.log(response);
        localStorage.setItem('token',response.data.jwt);
        // setErrors((preverror)=>{
        //   return {
        //     ...preverror,
        //     emailError:'',
        //     passwordError:'' 
        //   }
        // })
        navigate('/blogs/')
        // setsignUpInputs((prev)=>{
        //   return {
        //     ...prev,
        //     email:'',
        //     password:''
        //   }
        // })
        
         
      }
      catch(e){
        console.log('catch block', e);
      }
      finally{
        
        setLoading(false);

      }

    }




  return (
    <div className='bg-white h-screen '>
           <div className='flex justify-center items-center h-screen '>
                  
                  <div className=' h-96 w-96'>

                        <div className='text-center font-bold text-3xl'>Create an account
                        </div>

                        <div className='pt-2 text-center font-medium text-gray-500'>Already have an account? <Link className='underline font-medium' to={'/'}>Signup</Link>
                        </div>
                        
                             <InputBox label={'Email'} placeholder={'example@gmail.com'} value={signInInputs.email} onChange={(e)=>{
                                 setsignInInputs({
                                  ...signInInputs,
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
                         <InputBox label={'Password'} placeholder={'abc@@ABC124'} value={signInInputs.password} onChange={(e)=>{
                                 setsignInInputs({
                                  ...signInInputs,
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
                        <button onClick={handleForm} className='bg-[#1F1F1F] text-white  w-full mt-6 p-3 rounded-md hover:bg-black transition ease-in'>Login</button>
                        </div>
                        


                   






                  </div>

           </div>   
    </div>
  )
}
export default SigninLeft
