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
        err.password=toast.error('Wrong Password...!')
    }
    else if(values.password.length<5){
        err.password=toast.error("Password must be mor than 4 characters")
    }
    else if(!specialChars.test(values.password)){
        err.password=toast.error("Password must have atleast one special character")
    }

    return err;
}