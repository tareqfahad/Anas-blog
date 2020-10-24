import express from 'express';
import {login , authLocal} from '../Controllers/auth.js'
const router = express.Router();

router.route("/login").post(authLocal, login);


export default router;