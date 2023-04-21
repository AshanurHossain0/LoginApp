import mongoose from 'mongoose'

const UserSchema=new mongoose.Schema({
    username : {
        type:String,
        required:[true, "Please provide unique username"],
        unique:[true, "username already exist"]
    },
    password:{
        type:String,
        required:[true, "Please provide a password"]
    },
    email:{
        type:String,
        required:[true, "Please provide a email"],
        unique:true
    },
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:Number},
    address:{type:String},
    profile:{type:String}

})

export default mongoose.model.Users || mongoose.model("User",UserSchema)