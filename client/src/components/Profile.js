import React, { useState } from 'react'
import avatar from '../assets/profile.png'
import toast, {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { profileValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import useFetch from '../hooks/hook.js'
import { updateUser } from '../helper/helper.js'
import {useNavigate} from 'react-router-dom'

import styles from "../styles/Username.module.css"
import pflStyle from "../styles/Profile.module.css"

export default function Profile() {
  const [file,setFile]=useState()

  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
  const formik=useFormik({
    initialValues:{
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''

    },
    enableReinitialize: true,
    validate:profileValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
    }
  })

  const onUpload= async e=>{
    const base64=await convertToBase64(e.target.files[0]);
    setFile(base64)
  }
  //logout
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message+"ok"}</h1>
  return (
    <div className="container mx-auto">
      
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex h-screen justify-center items-center' >
        <div className={`${styles.glass} ${pflStyle.glass}`} style={{width:"45%" , paddingTop:"3cm"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500" >
              You can update profile details
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex flex-col items-center py-4">
              <label htmlFor="profile">
                <img  src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${pflStyle.profile_img}`} alt='avatar' />
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile"></input>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${pflStyle.textbox}`} type="text" placeholder='First Name' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${pflStyle.textbox}`} type="text" placeholder='Last Name' />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${pflStyle.textbox}`} type="text" placeholder='Mobile Number' />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${pflStyle.textbox}`} type="text" placeholder='Email*' />
              </div>

              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${pflStyle.textbox}`} type="text" placeholder='Address' />
              <button className={styles.btn} type="submit">Update</button>

            </div>

            <div className="text-center py-4">
            <span className='text-gray-500'>Want to Logout? <button onClick={userLogout} className='text-red-500'>Logout Now</button></span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

