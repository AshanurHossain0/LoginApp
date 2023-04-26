import axios from 'axios';
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;

export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}
//authenticate
export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate',{username})
    }
    catch(error){
        return {error:"Username doesn't exist"}
    }
}
// register user
export async function registerUser(userDetails){
    try{
        const {data:{msg},status}=await axios.post("/api/register",userDetails);
        let {username,email}=userDetails;

        if(status===201){
            await axios.post("/api/registerMail",{username,userEmail:email, text:msg})
        }
        return Promise.resolve(msg);
    }
    catch(error){
        return {error:error}
    }
}

// login
export async function login({username,password}){
    try{
        if(username){
            const {data}=await axios.post("/api/login",{username,password});
            return Promise.resolve({data});

        }
    }
    catch(error){
        return Promise.reject({error:"Password doesn't match"});
    }
}

// get user details
export async function getUser({username}){
    try{
        const {data}=await axios.get(`/api/user/${username}`)
        return {data};
    }
    catch(error){
        return {error: "Password doesn't match"}
    }
}

// updateUser
export async function updateUser(userData){
    try{
        const token=localStorage.getItem("token");
        const data=await axios.put("/api/updateUser",userData,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error:"Couldn't update profile"})
    }
}

//generateOTP
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 200){
            let { data:{email}} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

//verify OTP
export async function verifyOTP({username,code}){
    try{
        const {data,status}=await axios.get("/api/verifyOTP",{params:{username,code}});
        return {data,status};
    }
    catch(error){
        return Promise.reject({error});
    }
}

//Reset password
export async function resetPassword({username,password}){
    try{
        const {data,status}=await axios.put("/api/resetPassword",{username,password});
        return Promise.resolve({data,status})
    }
    catch(error){
        return Promise.reject({error})
    }
}
