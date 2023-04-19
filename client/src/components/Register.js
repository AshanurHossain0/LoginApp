import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import avatar from '../assets/profile.png'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { registerValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'

import styles from "../styles/Username.module.css"

export default function Register() {
  const [file,setFile]=useState()

  const formik=useFormik({
    initialValues:{
      email:"",
      username:"",
      password:""

    },
    validate:registerValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
      values = await Object.assign(values,{profile:file || ""})
      console.log(values);
    }
  })

  const onUpload= async e=>{
    const base64=await convertToBase64(e.target.files[0]);
    setFile(base64)
  }
  return (
    <div className="container mx-auto">
      
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex h-screen justify-center items-center'>
        <div className={styles.glass} style={{width:"45%", paddingTop:"3cm"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500" >
              Welcome dear
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex flex-col items-center py-4">
              <label htmlFor="profile">
                <img src={file || avatar} className={styles.profile_img} alt='avatar' />
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile"></input>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password*' />
              <button className={styles.btn} type="submit">Register Now</button>
            </div>

            <div className="text-center py-4">
            <span className='text-gray-500'>Already Registered? <Link to="/" className='text-red-500'>Login Now</Link></span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
