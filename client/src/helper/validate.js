import toast from 'react-hot-toast'

//validate username
export async function usernameValidate(values){
    const error=usernameVerify({},values);

    return error;
}

function usernameVerify(err={},values){
    if(!values.username){
        err.username = toast.error('Username is Required...!')
    }
    else if(values.username.includes(" ")){
        err.username=toast.error('Invalid Username...!')
    }
    return err;
}

//validate password
export async function passwordValidate(values){
    const error=passwordVerify({},values);

    return error;
}

function passwordVerify(err={},values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        err.password=toast.error('Password is Required...!')
    }
    else if(values.password.includes(" ")){
        err.password=toast.error('Wrong Password, <space> is not allowed...!')
    }
    else if(values.password.length<5){
        err.password=toast.error("Password must be mor than 4 characters")
    }
    else if(!specialChars.test(values.password)){
        err.password=toast.error("Password must have atleast one special character")
    }

    return err;
}

// validate reset password
export async function resetPwdValidation(values){
    const err=passwordVerify({},values);
    if(values.password !== values.confirm_pwd){
        err.exist = toast.error("Password not matched...!");
    }
    return err;
}

//validate email
function emailValidate(err={},values){
    if(!values.email){
        err.email=toast.error("Email is Required...!")
    }
    else if(values.email.includes(" ")){
        err.email=toast.error("Wrong Email...!")
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        err.email = toast.error("Invalid email address...!")
    }
    return err;
}


//validate register form

export async function registerValidate(values){
    const err=usernameVerify({},values)
    passwordVerify(err,values);
    emailValidate(err,values);
    return err;
}
