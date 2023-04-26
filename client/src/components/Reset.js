
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {resetPwdValidation} from '../helper/validate'
import {resetPassword} from '../helper/helper.js'
import {useAuthStore} from '../store/store.js'
import {useNavigate,Navigate} from 'react-router-dom'
import useFetch from '../hooks/hook.js'

import styles from "../styles/Username.module.css"

export default function Reset() {

  const {username}=useAuthStore(state=>state.auth);
  const navigate=useNavigate();
  const [{isLoading,serverError,status}]=useFetch('createResetSession')


  const formik=useFormik({
    initialValues:{
      password:"",
      confirm_pwd:""

    },
    validate:resetPwdValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
      let resetPromise=resetPassword({username,password:values.password});
      toast.promise(resetPromise,{
        loading:'Please wait, We are updating your password',
        success:<b>Reset Successful</b>,
        error:<b>Can't update reset password</b>
      })
      resetPromise.then(()=>{
        navigate('/password')
      })
    }
  })


  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status!==200) return <Navigate to={'/password'} replace={true}></Navigate>

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