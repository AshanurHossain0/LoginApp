import React,{useEffect, useState} from 'react'
import toast,{ Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store.js'
import { generateOTP,verifyOTP } from '../helper/helper.js'
import { useNavigate } from 'react-router-dom'

import styles from "../styles/Username.module.css"

export default function Password() {
  const {username}=useAuthStore(state=>state.auth)
  const [OTP,setOTP]=useState();

  const navigate=useNavigate()

  useEffect(()=>{
    generateOTP(username).then(OTP=>{
      if(OTP) return toast.success('OTP is sent to your email');
      return toast.error('OTP generation failed')
    })
  },[username])


  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 200){
        toast.success('Verified Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }
  function resendOTP(){
    let sendPromise=generateOTP(username);
    toast.promise(sendPromise,{
      loading:'Sending...',
      success:<b>OTP is sent to your email</b>,
      error:<b>Can't send OTP</b>
    })
    sendPromise.then(OTP=>{
      // console.log(OTP);
    })
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex h-screen justify-center items-center'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500" >
              Enter OTP to recover password
            </span>
          </div>

          <form className="pt-19" onSubmit={onSubmit}>


            <div className="textbox flex flex-col items-center gap-6">

              {/* <div className="input text-center "> */}

                <span className='pt-10 text-sm text-left text-gray-500'>
                  Enter 6 digit otp sent to email address
                </span>
                <input onChange={(e)=>setOTP(e.target.value)} className={styles.textbox} type="text" placeholder='OTP' />

              {/* </div> */}
              <button className={styles.btn} type="submit">Recover</button>
            </div>
          </form>
          <div className="text-center py-4">
              <span className='text-gray-500'>OTP not sent? <button onClick={()=>{resendOTP()}} className='text-red-500'>Resend OTP</button></span>
          </div>

        </div>
      </div>
    </div>
  )
}


