import Usermodel from "../model/Usermodel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import otpGnrt from 'otp-generator'

//middleware
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        //check user existance
        const existUser = await Usermodel.findOne({ username });
        if (!existUser) return res.status(404).send({ error: "User not found" });
        next();
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        const existUsername = await Usermodel.findOne({ username: username });
        if (existUsername) return res.status(500).send({ msg: "Username already exist ." })

        const existEmail = await Usermodel.findOne({ email: email });
        if (existEmail) return res.status(500).send({ msg: "Email is already exist" })

        if (password) {
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    const user = new Usermodel({
                        username: username,
                        password: hashedPassword,
                        profile: profile || "",
                        email: email
                    })
                    user.save()
                        .then(result => res.status(201).send({ msg: "Registration Successfull" }))
                        .catch(error => res.status(500).send({ error }))
                }).catch(error => {
                    return res.status(500).send({ error: "Unable to hash password" });
                })
        }
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await Usermodel.findOne({ username });
        if (!user) return res.status(404).send({ error: "User not found" })
        bcrypt.compare(password, user.password)
            .then((checkPass) => {
                if (!checkPass) return res.status(400).send({ error: "Incorrect password" });

                //create token
                const token = jwt.sign({
                    userId: user._id,
                    username: username
                }, ENV.JWT_SECRET, { expiresIn: "24h" })

                return res.status(200).send({ msg: "Login Successfull", username: username, token })
            })
            .catch(error => {
                return res.status(400).send({ error: error.message })
            })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

export async function getUser(req, res) {
    try {
        const { username } = req.params;
        const user = await Usermodel.findOne({ username }).select({ password: 0, __v: 0 });
        if (!user) return res.status(404).send({ eror: "User not found" });

        return res.status(200).send(user)

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

export async function updateUser(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {
            const updatedUserData = await Usermodel.findOneAndUpdate({ _id: userId }, req.body)
            if (!updatedUserData) return res.status(404).send({ error: "Id not found" });
            return res.status(200).send({ msg: "Updation Successfull" })
        }
        else {
            return res.status(404).send({ error: "User Not Found...!" });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

export async function genOTP(req, res) {
    try {
        req.app.locals.OTP = otpGnrt.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        return res.status(200).send({ code: req.app.locals.OTP })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

export async function verifyOTP(req, res) {
    try {
        const { code } = req.query;
        if (parseInt(req.app.locals.OTP) === parseInt(code)) {
            req.app.locals.OTP = null;
            req.app.locals.resetSession = true;
            return res.status(200).send({ msg: "Verified Successfully" });
        }
        return res.status(400).send({ error: "Invalid OTP" })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(200).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
}

export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) return res.status(440).send({ msg: "Session expired" })
        const { username, password } = req.body;

        const user = Usermodel.findOne({ username });
        if (!user) return res.status(404).send({ msg: "Username not found" });


        bcrypt.hash(password, 10, async function(err, hash) {
            if(err) throw new Error(err);
            await Usermodel.findOneAndUpdate({ username: username }, { password: hash });
            req.app.locals.resetSession = false;
            return res.status(200).send({ msg: "Updation successfull" })
        });
        
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}