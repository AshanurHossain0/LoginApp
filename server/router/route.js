
import {Router} from 'express';
import auth, {localVar} from "../middleware/auth.js"
import {registerMail} from '../controllers/mailer.js'
const router=Router();

import * as controller from '../controllers/controller.js'

router.route('/register').post(controller.register)
router.route('/registerMail').post(registerMail)
router.route('/authenticate').post(controller.verifyUser,(req,res)=>res.end())
router.route('/login').post(controller.login)

router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser,localVar, controller.genOTP)
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

router.route('/updateUser').put(auth,controller.updateUser)
router.route('/resetPassword').put(controller.resetPassword)

export default router;