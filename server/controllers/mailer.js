import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js'

let nodeconfig={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter=nodemailer.createTransport(nodeconfig);

let MailGen=new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:"https://mailgen.js"
    }
})

export const registerMail= async (req,res)=>{
    const {username,userEmail,text,subject}=req.body;

    var email={
        body:{
            name:username,
            intro:text || "Welcome to nur's app",
            outro: 'Need any help? Reply to the email.'
        }
    }

    var emailBody=MailGen.generate(email)
    let message={
        from:ENV.EMAIL,
        to:userEmail,
        subject:subject || "Sign up successfull",
        html:emailBody
    }

    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg:"You are sent a email from us"});
    })
    .catch(error=>res.status(500).send({error}))
}