
import {Router} from 'express';
import auth from "../middleware/auth.js"
const router=Router();

import * as controller from '../controllers/controller.js'

router.route('/register').post(controller.register)
// router.route('/registerMail').post((req,res)=>{return res.json("Hello")})
router.route('/authenticate').post((req,res)=>res.end())
router.route('/login').post(controller.login)

router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.genOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

router.route('/updateUser').put(auth,controller.updateUser)
router.route('/resetPassword').put(controller.resetPassword)

export default router;