import express from 'express';
import {signUp} from '../Controllers/User.js'
const router = express.Router();

router.route("/").post(signUp);


export default router;