import { Router } from 'express';
const router = Router();

import * as controllers from '../controllers/appController.js';
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from '../middleware/auth.js';


// POST Methods
router.route('/register').post(controllers.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/auth').post(controllers.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controllers.verifyUser, controllers.login); // login in app

// GET Methods
router.route('/user/:username').get(controllers.getUser); // user with username
router.route('/generateOTP').get(controllers.verifyUser, localVariables, controllers.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controllers.verifyUser, controllers.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controllers.createResetSession); // reset all the variables

// PUT Methods
router.route('/updateuser').put(Auth, controllers.updateUser); // is user to update the user profile
router.route('/resetPassword').put(controllers.verifyUser, controllers.resetPassword); // use to reset password

export default router;