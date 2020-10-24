import express from 'express';
import {addComment} from '../Controllers/comments.js'
const router = express.Router();


router.route("/:blogId").post(addComment);


export default router;