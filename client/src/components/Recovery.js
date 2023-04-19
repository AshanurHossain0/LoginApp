import React from 'react'
import { Toaster } from 'react-hot-toast'

import styles from "../styles/Username.module.css"

export default function Password() {

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

          <form className="pt-19">


            <div className="textbox flex flex-col items-center gap-6">

              {/* <div className="input text-center "> */}

                <span className='pt-10 text-sm text-left text-gray-500'>
                  Enter 6 digit otp sent to email address
                </span>
                <input className={styles.textbox} type="text" placeholder='OTP' />

              {/* </div> */}
              <button className={styles.btn} type="submit">Recover</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>OTP not sent? <button className='text-red-500'>Resend OTP</button></span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}


