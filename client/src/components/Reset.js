import React from 'react'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {resetPwdValidation} from '../helper/validate'

import styles from "../styles/Username.module.css"

export default function Reset() {

  const formik=useFormik({
    initialValues:{
      password:"",
      confirm_pwd:""

    },
    validate:resetPwdValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
    }
  })

  return (
    <div className="container mx-auto">
      
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex h-screen justify-center items-center'>
        <div className={styles.glass} style={{width:"50%"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500" >
              Enter new password
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' />
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Confirm Password' />
              <button className={styles.btn} type="submit">Reset</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}